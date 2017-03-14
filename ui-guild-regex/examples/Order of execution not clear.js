define(function(require) {

    'use strict';

    var Backbone = require('backbone');
    var GenericView = require('generic.view');
    var template = require('text!components/synthesis/status-display/templates/synthesis-status.tpl.html');
    var TransitionManager = require('transition.manager');
    var ViewManager = require('view.manager');
    var SynthesisQueuedView = require('components/synthesis/status-display/views/synthesis-queued.view');
    var SynthesisNoDataView = require('components/synthesis/status-display/views/synthesis-no-data.view');
    var PredictionQueuedView = require('components/synthesis/status-display/views/prediction-queued.view');
    var SynthesisResultView = require('components/synthesis/synthesis-tree/views/result.view');
    var PredictionPausedView = require('components/synthesis/status-display/views/prediction-paused.view');
    var SynthesisProcessView = require('components/synthesis/status-display/views/loading-progress.view');
    var UpdateDecorator = require('components/synthesis/synthesis-progress/views/decorators/progress-update.decorator');
    var ServiceError = require('components/service-request/decorators/service-request.decorator');
    var SynthesisModel = require('components/synthesis/synthesis-progress/models/synthesis.model');
    var RescoreView = require('components/synthesis/modals/restore/views/rescore.view');

    /**
     * View for handling synthesis edge-cases
     * @class SynthesisStatusView
     * @extends GenericView
     */
    return GenericView.extend({

        /**
         * Template for this view's container
         * @property tpl
         */
        tpl: template,

        transitionManager: undefined,

        viewManager: undefined,

        currentStatusView: undefined,

        treeType: undefined,

        model: new Backbone.Model(),

        /**
         * Views for various edge-cases
         * @property statusViewList
         * @type Array
         */
        statusViewList: [
            {
                name: 'progress',
                viewModule: SynthesisProcessView
            },
            {
                name: 'queued',
                viewModule: SynthesisQueuedView

            },
            {
                name: 'noData',
                viewModule: SynthesisNoDataView,
                events: {
                    'edit-query': 'editQueryHandler'
                }

            },
            {
                name: 'predictionQueued',
                viewModule: PredictionQueuedView

            },
            {
                name: 'known-tree',
                viewModule: SynthesisResultView,
                cachedTreeData: undefined,
                events: {

                    'known-literature-shows': 'knownLiteratureShowHandler',
                    'show-alternative-grid': 'showAlternativesGridView',
                    'exact-known-literature-shows': 'exactKnownLiteratureShowHandler',
                    'rescore-tree': 'rescoreTreeHandler',
                    'remove-tree-tabs': 'removeTreeTabsHandler',
                    'cache-data': 'cacheData',
                    'tree-is-ready': 'knownTreeIsReady',
                    'hide-download-spinner': 'hideDownloadSpinner',
                    'update-alternate': 'updateAlternateRoute'
                }

            },
            {
                name: 'prediction-tree',
                viewModule: SynthesisResultView,
                cachedTreeData: undefined,
                events: {

                    'known-literature-shows': 'knownLiteratureShowHandler',
                    'show-alternative-grid': 'showAlternativesGridView',
                    'exact-known-literature-shows': 'exactKnownLiteratureShowHandler',
                    'rescore-tree': 'rescoreTreeHandler',
                    'remove-tree-tabs': 'removeTreeTabsHandler',
                    'cache-data': 'cacheData',
                    'tree-is-ready': 'predictionTreeIsReady',
                    'hide-download-spinner': 'hideDownloadSpinner',
                    'update-alternate': 'updateAlternateRoute'
                }

            },
            {
                name: 'paused',
                viewModule: PredictionPausedView,
                events: {

                    'resume-prediction': 'predictionResumeHandler'
                }
            }
        ],

        /**
         * Decorators used in the view
         * @property decorators
         * @type Object
         */
        decorators: {

            update: UpdateDecorator,
            error: ServiceError
        },

        appendTpl: function() {

            GenericView.prototype.appendTpl.apply(this, arguments);

            this.viewManager = new ViewManager();
            var statusContainer = this.$el.find('.status-content');

            this.transitionManager = new TransitionManager(statusContainer);
            this.showStatusView(0);
        },

        exportHandler: function(model) {
            if (this.treeType === 'known') {
                this.statusViewList[4].view.generateFile(model, this.knownAlternateRoute);
            } else {
                this.statusViewList[5].view.generateFile(model, this.predictedAlternateRoute);
            }
        },

        hideDownloadSpinner: function() {
            this.trigger('hide-download-spinner');
        },

        knownTreeIsReady: function() {
            this.trigger('tree-is-ready', {predicted: false});
        },

        predictionTreeIsReady: function() {
            this.trigger('tree-is-ready', {predicted: true});
        },

        /**
         * Triggers edit-query event
         * @method editQueryHandler
         */
        editQueryHandler: function() {
            this.trigger('edit-query');
        },

        /**
         * Displays view for queued synthesis
         * @method showQueuedView
         */
        showQueuedView: function() {

            this.showStatusView(1);
        },

        /**
         * Displays view for no-data for synthesis
         * @method showNoDataView
         */
        showNoDataView: function() {

            this.showStatusView(2);
            this.addStatusEvents(2);
        },

        /**
         * Loads the synthesis tree
         * @method loadSynthesisTree
         * @param data {Object} response from status/resultnode api call
         * @param status {String}
         */
        loadSynthesisTree: function(data, status) {

            if (status === 'queued') {

                this.showStatusView(1);
                Backbone.trigger('hide:modal');
            } else if (status === 'noData') {

                this.showStatusView(2);
                this.addStatusEvents(2);
                Backbone.trigger('hide:modal');
            } else {

                if (data.predicted) {

                    data.cachedTreeData = this.statusViewList[5].cachedTreeData;
                    this.treeType = 'predicted';
                    this.showStatusView(5, data);
                    this.addStatusEvents(5);
                    this.setRescoreSpinnerState(5);
                } else {
                    data.cachedTreeData = this.statusViewList[4].cachedTreeData;
                    this.treeType = 'known';
                    this.showStatusView(4, data);
                    this.addStatusEvents(4);
                    this.setRescoreSpinnerState(4);
                }
            }
        },

        /**
         * Displays view for queued predictions
         * @method predictionQueued
         */
        predictionQueued: function() {

            this.showStatusView(3);
        },

        /**
         * Triggers prediction-resume event
         * @method predictionResumeHandler
         */
        predictionResumeHandler: function() {

            this.trigger('prediction-resume');
        },

        /**
         * Displays view for paused predictions
         * @method predictionQueued
         */
        predictionStop: function() {

            this.showStatusView(6);
            this.addStatusEvents(6);
        },

        /**
         * Displays view for progress loader
         * @method resumeSuccess
         */
        resumeSuccess: function() {

            this.showStatusView(0);
        },

        /**
         * Shows the status view at given index in statusViewList
         * @method showStatusView
         * @param subviewIndex {Integer} index in statusViewList
         * @param [data] {Object}
         */
        showStatusView: function(subviewIndex, data) {

            var name =  this.statusViewList[subviewIndex].name;
            this.currentStatusView = this.viewManager.getView(name);
            if (!this.currentStatusView) {

                this.statusViewList[subviewIndex].view = this.viewManager.registerView(name, function() {

                    return new this.statusViewList[subviewIndex].viewModule();
                }.bind(this));

                this.currentStatusView = this.statusViewList[subviewIndex].view;
            } else {
                this.statusViewList[subviewIndex].view = this.currentStatusView;
            }

            if (data) {

                var options = {};
                options.data = data;
                this.statusViewList[subviewIndex].view.options = options;
            }

            this.transitionManager.showView(this.currentStatusView);
        },

        /**
         * Adds events for the view at given index in statusViewList
         * @method addStatusEvents
         * @param subviewIndex {Integer} index in statusViewList
         */
        addStatusEvents: function(subviewIndex) {

            if (this.statusViewList[subviewIndex].events &&
                typeof this.statusViewList[subviewIndex].events === 'object') {

                _.keys(this.statusViewList[subviewIndex].events).forEach(function(event) {

                    var handler = this[this.statusViewList[subviewIndex].events[event]];
                    this.listenTo(this.currentStatusView, event, handler.bind(this));
                }.bind(this));
            }
        },

        /**
         * Removes the status view at given index in statusViewList
         * @method removeView
         * @param subviewIndex {integer} index in statusViewList
         */
        removeView: function(subviewIndex) {

            var name =  this.statusViewList[subviewIndex].name;
            this.viewManager.removeView(name);
        },

        /**
         * Triggers known-literature-shows event
         * @method knownLiteratureShowHandler
         */
        knownLiteratureShowHandler: function() {

            this.trigger('known-literature-shows');
        },

        /**
         * Triggers show-alternative-grid event
         * @method showAlternativesGridView
         * @param data {Object}
         */
        showAlternativesGridView: function(data) {

            this.trigger('show-alternative-grid', data);
        },

        /**
         * Triggers exact-known-literature-shows event
         * @method exactKnownLiteratureShowHandler
         */
        exactKnownLiteratureShowHandler: function() {

            this.trigger('exact-known-literature-shows');
        },

        /**
         * Starts synthesis tree rescoring
         * @method resultViewRescoreHandler
         * @param dataValue
         */
        resultViewRescoreHandler: function(dataValue, nodeDepth) {

            this.nodeDepth = nodeDepth;

            if (this.treeType) {
                if (this.treeType === 'predicted') {
                    if (this.statusViewList[5].view._events) {
                        this.statusViewList[5].view.startRescoreHandler(dataValue);
                    } else {
                        this.rescoreTreeHandler(SynthesisModel.get('isPredicted'));
                    }

                } else {
                    if (this.statusViewList[4].view._events) {
                        this.statusViewList[4].view.startRescoreHandler(dataValue);
                    } else {
                        this.rescoreTreeHandler(SynthesisModel.get('isPredicted'));
                    }
                }
            }
        },

        refreshIScroll: function() {

            if (this.treeType) {
                if (this.treeType === 'predicted') {
                    this.statusViewList[5].view.refreshIScroll();

                } else {
                    this.statusViewList[4].view.refreshIScroll();
                }
            }
        },

        /**
         * Starts synthesis tree rescoring
         * @method rescoreTreeHandler
         * @param isPredicted {boolean} True if tree is predicted, false otherwise
         * @param [alternateInfo] {Object} Optional parameter for alternates where tree is drawn from given node
         */
        rescoreTreeHandler: function(isPredicted, alternateInfo) {
            this.model.clear();

            if (isPredicted === true) {
                this.removeView(5);
            } else if (isPredicted === false) {
                this.removeView(4);
            }
            if (!alternateInfo) {

                this.rescoreSpinnerIsShown = true;
                this.model.set('isRestored', true);
                this.model.set('predicted', isPredicted);
                var rescoreView = new RescoreView();
                rescoreView.render();
                Backbone.trigger('show:modal', {modalView: rescoreView});
                this.updateModelURL('status');
                this.fetchData();
            } else {

                var data = {
                    isRestored: true,
                    predicted: isPredicted,
                    alternateInfo: alternateInfo
                };
                this.loadSynthesisTree(data);
            }
        },

        setRescoreSpinnerState: function(index) {
            this.statusViewList[index].view.rescoreSpinnerIsShown = this.rescoreSpinnerIsShown;
            this.rescoreSpinnerIsShown = false;
        },

        updateAlternateRoute: function(isPredicted, alternateInfo) {
            /*
                alternateRoute object is used to cache user interaction
                with the tree when user choose alternative route.
                each time user clicks on alternative if it's alternative
                of new product it's added to the object, if the product exists
                in the object it will be updated then this object will be passed
                to to the print service to display the last state of the tree
            */

            this.knownAlternateRoute = this.knownAlternateRoute || {};
            this.predictedAlternateRoute = this.predictedAlternateRoute || {};

            if (isPredicted) {

                this.predictedAlternateRoute[alternateInfo.Product + '_depth_' + this.nodeDepth] = alternateInfo;

                this.predictedAlternateRoute = _.pick(this.predictedAlternateRoute, function(value, key) {
                    var depth = key.match(/\d*_depth_(\d*)$/)[1];
                    return depth <= this.nodeDepth;
                }, this);

            } else {

                this.knownAlternateRoute[alternateInfo.Product + '_depth_' + this.nodeDepth] = alternateInfo;
                this.knownAlternateRoute = _.pick(this.knownAlternateRoute, function(value, key) {
                    var depth = key.match(/\d*_depth_(\d*)$/)[1];
                    return depth <= this.nodeDepth;
                }, this);
            }
        },

        /**
         * Sets price and yield display options for a tree
         * @method updateTreeDisplayHandler
         * @param data {Array} String array containing options to be displayed
         */
        updateTreeDisplayHandler: function(data) {

            if (this.statusViewList[4].view) {
                this.statusViewList[4].view.updateTreeDisplayHandler(data);
            }
            if (this.statusViewList[5].view) {
                this.statusViewList[5].view.updateTreeDisplayHandler(data);
            }
        },

        unhighlightTree: function() {
            if (this.statusViewList[4].view) {
                this.statusViewList[4].view.unhighlightTreeSvg();
            }
            if (this.statusViewList[5].view) {
                this.statusViewList[5].view.unhighlightTreeSvg();
            }
        },

        fetchData: function() {

            this.xhrRequest = this.model.fetch()
                .done(this.fetchSuccess)
                .fail(this.serviceError);
        },

        /**
         * Triggers remove-tree-tabs event
         * @method removeTreeTabsHandler
         */
        removeTreeTabsHandler: function() {

            this.trigger('remove-tree-tabs');
        },

        onClose: function() {

            var that = this;
            GenericView.prototype.onClose.call(this);
            this.statusViewList.forEach(function(element, i) {

                if (element.view) {
                    element.view.close();

                }
                if (that.viewManager) {

                    that.viewManager.removeView(element.name);
                }
            });
            this.statusViewList = [];
        },

        /**
         * Caches the displayed synthesis tree on switching between exact-matches and predictions
         * @method cacheData
         * @param treeData {Object} Tree to be cached
         */
        cacheData: function(treeData) {

            if (this.treeType === 'predicted') {
                this.statusViewList[5].cachedTreeData = $.extend({}, treeData);
            } else {
                this.statusViewList[4].cachedTreeData =  $.extend({}, treeData);
            }
        }
    });
});
