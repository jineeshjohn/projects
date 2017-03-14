/* jshint sub: true */
define(function(require) {

    'use strict';

    var Backbone = require('backbone');
    var GenericView = require('generic.view');
    var $ = require('jquery');
    var _ = require('underscore');
    var template = require('text!components/synthesis/synthesis-tree/templates/synthesis-tree.tpl.html');
    var Session = require('session/session.model');

    // Decorators
    var DrawDecorator = require('components/synthesis/synthesis-tree/views/decorators/draw.decorator');
    var InitializeDecorator = require('components/synthesis/synthesis-tree/views/decorators/d3Initialize.decorator');
    var LinksDecorator = require('components/synthesis/synthesis-tree/views/decorators/draw-tree-links.decorator');
    var NodesDecorator = require('components/synthesis/synthesis-tree/views/decorators/draw-tree-nodes.decorator');
    var OptDecorator = require('components/synthesis/synthesis-tree/views/decorators/draw-tree-options.decorator');
    var CollapseDecorator =
        require('components/synthesis/synthesis-tree/views/decorators/tree-node-collapse.decorator');
    var ImageDecorator = require('components/synthesis/synthesis-tree/views/decorators/tree-images.decorator');
    var TooltipDecorator = require('components/synthesis/synthesis-tree/views/decorators/price-tooltip.decorator');
    var RecursiveDecorator = require('components/synthesis/synthesis-tree/views/decorators/recursive.decorator');
    var UpdateDecorator = require('components/synthesis/synthesis-progress/views/decorators/progress-update.decorator');
    var ServiceRequestDecorator = require('components/service-request/decorators/service-request.decorator');

    // Models
    var SynthesisModel = require('components/synthesis/synthesis-progress/models/synthesis.model');
    var RuleModel = require('components/synthesis/literature/rule-panel/models/rule.model');
    var LiteratureModel = require('components/literature/landing/models/literature.model');
    var RouteInfoModel = require('components/synthesis/route-info/model/route-info.model');
    var DisplaySettingsCollection = require('components/synthesis/toolbar-panel/display-settings/display-settings.collection');

    var MoleculeOptionsMenuView = require('components/synthesis/synthesis-tree/views/molecule-options.view');
    var ReactionOptionsMenuView = require('components/synthesis/synthesis-tree/views/reaction-options.view');

    var TransitionMixin = require('components/fade-transition/mixins/element-transition.mixin');
    var iscroll = require('iscroll');

    // Modals
    var EditCustomYieldView = require('components/synthesis/modals/edit-yield/views/edit-custom-yield.view');
    var EditCustomPriceView = require('components/synthesis/modals/starting-material/views/edit-custom-price.view');

    // Mixins
    var chemplannerMixins = require('chemplanner.mixins/chemplanner.mixin');

    var config = require('config');
    var self = null;

    /**
     * View for drawing synthesis tree
     * @class ResultView
     * @extends GenericView
     */
    return GenericView.extend({

        tpl: template,

        model: new Backbone.Model(),

        solutionIds: [],
        imageMap: undefined,

        treeScroll: undefined,

        isLinkGreyed: undefined,

        treeData: undefined,

        RESCORE_MODAL_TIME: 5000,
        hideTimeout: undefined,

        priceTooltipHideTimeout: 100,

        nodeSelector: 'node',
        linkSelector: 'link',
        exactMatchSelector: 'exact',
        predictedSelector: 'predicted',
        nodeGroupSelector: 'node-grp',
        collapseIconSelector: 'node-collapse',
        rxnBubbleSelector: 'rxn-bubble',
        moleculeOptionSelector: 'mol-option',
        yieldGroupSelector: 'yield-grp',
        priceGroupSelector: 'price-grp',
        linkArrowSelector: 'solid-arrow',
        linkDashedArrowSelector: 'dash-arrow',

        /**
         * Events for the view
         * @property events
         * @type Object
         */
        events: {
            'click .node-collapse': 'collapseOrExpandHandler',
            'click image.mol-option, image.rxn-bubble': 'showMenuHandler',
            'mouseenter g.price-grp, .price-tooltip': 'showPriceTooltipHandler',
            'mouseenter g.yield-grp, .yield-tooltip': 'showYieldTooltipHandler',
            'mouseleave g.yield-grp': 'hideHelpHandler',
            'mouseleave .yield-tooltip': 'hideHelpPanel',
            'mouseleave g.price-grp': 'hideHelpHandler',
            'mouseleave .price-tooltip': 'hideHelpPanel',
            'click g.yield-grp': 'editCustomYieldHandler',
            'click g.price-grp': 'editCustomPriceHandler',
            'click .colorCodeLegend': 'toggleBondColorLegends'
        },

        /**
         * Decorators used in the view
         * @property decorators
         * @type Object
         */
       k

        /**
         * Mixins used in the view
         * @property mixins
         * @type Object
         */
        mixins: {

            transition: TransitionMixin,
            chemplannerMixins: chemplannerMixins
        },

        constructor: function SynthesisResultsView() {
            return GenericView.prototype.constructor.apply(this, arguments);
        },

        copyDisplayAttrsOntoView: function() {
            _.extend(this, _.object(DisplaySettingsCollection.map(function(model) {
                return [model.id, model.get('value')];
            })));
        },

        toggleBondColorLegends: function() {
            this.$('.colorCodeLegend').toggleClass('colorCodeLegend_isExpanded');
        },

        generateFile: function(model, alternate) {

            var dev = false;
            var url = dev ? '/generateFile' : '/export/pdf/post';
            alternate = alternate || null;

            var footerText = 'Solution for search #' + SynthesisModel.get('queryId') + ': ' + SynthesisModel.get('structureName'); // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

            var exportParams = {
                'page_parameters': {
                    'user': {
                        'headline': encodeURIComponent(model.get('headline')),
                        'body': encodeURIComponent(model.get('comment')),
                        'email': Session.get('email'),
                        'firstName': Session.get('firstName'),
                        'lastName': Session.get('lastName'),
                        'userId': Session.get('userId'),
                        'organisationUid': Session.get('organisationUid')
                    },
                    'search_parameters': {
                        'starting_materials': model.get('starting-materials'),
                        'structure_id': SynthesisModel.get('queryId'), // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        'structure_name': SynthesisModel.get('structureName'),
                        'security_code': SynthesisModel.get('securityCode'), // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        'alternate': alternate,
                        'route_info': RouteInfoModel.get('tree'),
                        'predicted': this.model.get('predicted'),
                        'urlRoot': location.host,
                        'queryHistoryId': SynthesisModel.get('queryHistoryId')
                    }
                },
                'service_parameters': {
                    'page': {
                        'zoomFactor': 1,
                        'viewportSize': {
                            'width': 1024,
                            'height': 900
                        },
                        'paperSize': {
                            'format': 'A4',
                            'orientation': 'portrait'
                        },
                        'footerText': footerText
                    },
                    'service': 'archemTreePdf'
                },
                session_id: Session.getStorageSessionId()
            };

            $.ajax({
                type: 'POST',
                data: JSON.stringify(exportParams),
                url: url,
                contentType: 'application/json'
            })
            .done(function(data) {
                document.location = '/export/pdf/download?id=' + data.id;
            }.bind(this))
            .always(function() {
                this.trigger('hide-download-spinner');
            }.bind(this));
        },

        setupTreeScroll: function() {
            if (!this.treeScroll) {
                return;
            }

            this.$el.find('.synthesis-tree-container').removeClass('grabbable');
            if (this.model.get('isRestored')) {
                var offsets = SynthesisModel.get('activeNodeOffsets');
                if (offsets && (this.treeScroll.hasVerticalScroll || this.treeScroll.hasHorizontalScroll)) {
                    this.treeScroll.scrollTo(offsets.x, offsets.y, 0);
                }
                if (this.options.data.alternateInfo) {
                    this.getTrIds(this.options.data.alternateInfo);
                    this.highlightNewAlternate(this.options.data.alternateInfo.Product);
                }
                this.model.unset('isRestored');
            } else if (this.treeScroll.hasVerticalScroll &&
                (this.targetMoleculePosition + this.rh) > this.$el.find('.synthesis-tree-container').height()) {
                this.treeScroll.scrollTo(0, -((this.targetMoleculePosition + this.rh + this.rh) -
                this.$el.find('.synthesis-tree-container').height()), 0, true);
            }

            if (this.treeScroll.hasVerticalScroll || this.treeScroll.hasHorizontalScroll) {
                this.$el.find('.synthesis-tree-container').addClass('grabbable');
            }
        },

        /**
         * Initializes d3 and i-scroll parameters before drawing the synthesis tree and adjusts scroll and drag
         * cursor after the tree is drawn
         * @method treeInitialize
         */
        treeInitialize: function() {

            this.model.get('treeData').solutionIds = this.solutionIds;
            this.trigger('cache-data', this.model.get('treeData'));
            if (this.model.get('isRestored') && !this.options.data.alternateInfo) {

                Backbone.trigger('hide:modal');
                this.showRestoreSuccessMessage();
            }

            this.initializeD3();

            this.renderTreeSvg(function() {
                var predicted = this.model.get('predicted');
                var data = this.options.data;
                this.trigger('tree-is-ready', {predicted: predicted});
                this.setupTreeScroll();
                if (data.alternateInfo) {
                    this.trigger('update-alternate', predicted, data.alternateInfo);
                }
            }.bind(this));
        },

        /**
         * Fetches images from image decorator and draws the tree
         * @method renderTreeSvg
         * @param callback {Function} callback function for adjusting i-scroll and drag cursor
         */
        renderTreeSvg: function(callback) {
            this.copyDisplayAttrsOntoView();

            // Alternatively, use `view.getImages` to make use of caching. You shouldn't though
            //  as this will mix previously cached color-coded images with new, potentialy
            //  non-color-coded images, and vice versa
            this.fetchImages(this.model.get('treeData').solutionIds, +SynthesisModel.get('queryId'),
                this.model.get('predicted'), SynthesisModel.get('securityCode'), function(data) {

                    self.imageMap = data;
                    self.updateTreeSvg();
                    self.hideElement(self.$el.find('.sk-spinner'));
                    setTimeout(function() {
                        self.treeScroll.refresh();
                        if (callback) {
                            callback();
                        }
                    }, 500);
                });
        },

        /**
         * Draws the tree
         * @method updateTreeSvg
         */
        updateTreeSvg: function() {
            this.copyDisplayAttrsOntoView();

            this.nodes = this.tree.nodes(this.root);
            this.draw();
            this.drawNodes(this.currentProductNodeId);
            this.drawLinks();
            this.drawOptionIcons();
            this.applyCurrentColorCodingDisplaySettings();
        },

        unhighlightTreeSvg: function() {
            this.currentProductNodeId = null;
            this.unhighlightReactionNodes();
            this.colorizeLinks();
        },

        /**
         * Toggles between node expand and collapse operations
         * @method collapseOrExpandHandler
         * @param evt {Object} The Click event
         */
        collapseOrExpandHandler: function(evt) {
            var nodeId = this.$el.find(evt.currentTarget).parents('.node').attr('id');
            var node = this.node.filter('#' + nodeId).data()[0];
            this.toggleCollapseExpand(node);
        },

        /**
         * Creates the view for changing reaction yield
         * @method editCustomYieldHandler
         * @param evt {Object} The Click event
         */
        editCustomYieldHandler: function(evt) {
            var nodeId = this.$el.find(evt.currentTarget).parents('.node').attr('id');
            var node = this.node.filter('#' + nodeId).data()[0];

            if (node['custom_yield'])  {
                var customYield;

                if (node['custom_yield'] !== undefined) {
                    customYield = Math.round(node['custom_yield']);
                }

                this.editCustomYieldView = new EditCustomYieldView();
                this.editCustomYieldView.model.set('originalYield', Math.round(node['yield']));
                this.editCustomYieldView.model.set('customYield', customYield);
                this.editCustomYieldView.model.set('query_id', SynthesisModel.get('queryId'));
                this.editCustomYieldView.model.set('security_code', SynthesisModel.get('securityCode'));
                this.editCustomYieldView.model.set('tr_id', node['tr_id']);
                this.editCustomYieldView.model.set('predicted', this.model.get('predicted'));
                this.editCustomYieldView.model.set('comment', node['comments']);
                this.listenTo(this.editCustomYieldView, 'restore-tree', this.startRescoreHandler, this);
                this.showCustomModel(this.editCustomYieldView);
            }

        },

        /**
         * Creates the view for changing molecule price
         * @method editCustomPriceHandler
         * @param evt {Object} The Click event
         */
        editCustomPriceHandler: function(evt) {

            var nodeId = this.$el.find(evt.currentTarget).parents('.node').attr('id');
            var node = this.node.filter('#' + nodeId).data()[0];
            var solutionId = node.Product ? parseInt(node.Product): node.Reactant;

            if (node.custom === 'yes') {

                this.editCustomPriceView = new EditCustomPriceView();
                this.editCustomPriceView.model.set('sm_id', node['start_material']);
                this.editCustomPriceView.model.set('price', node['price']);
                this.editCustomPriceView.model.set('vendor', node.vendor);
                this.editCustomPriceView.model.set('more_info', node['more_info']);
                this.editCustomPriceView.model.set('solution_id', solutionId);
                var startingMaterialModel = new Backbone.Model();
                startingMaterialModel.url = config.getArchemApiUrl() +
                'starting_material' +
                '?sm_id=' + node['start_material'] +
                '&query_id=' + parseInt(SynthesisModel.get('queryId')) +
                '&predicted=' + SynthesisModel.get('isPredicted') +
                '&security_code=' + SynthesisModel.get('securityCode');
                startingMaterialModel.fetch().success(this.setStartingMaterialComment.bind(this))
                    .fail(this.serviceError.bind(this));
            }

        },

        /**
         * Sets the user-given comment for change in starting material price
         * @method setStartingMaterialComment
         * @param data {Object} api response from ARchem starting_material api
         */
        setStartingMaterialComment: function(data) {

            var queryId = SynthesisModel.get('queryId');
            var securityCode = SynthesisModel.get('securityCode');
            var predicted = SynthesisModel.get('isPredicted');
            self.editCustomPriceView.model.set('query_id', queryId);
            self.editCustomPriceView.model.set('security_code', securityCode);
            self.editCustomPriceView.model.set('predicted', predicted);
            self.editCustomPriceView.model.set('comment', data.comment);
            self.listenTo(self.editCustomPriceView, 'restore-tree', self.startRescoreHandler, self);
            Backbone.trigger('show:modal', {modalView: self.editCustomPriceView});
        },

        /**
         * Triggers known-literature-shows event for currentNode object
         * @method knownLiteratureHandler
         */
        knownLiteratureHandler: function() {

            LiteratureModel.unset('resultsetId');
            // this.decolorizeUnselectedLinks(this.reactionOptionsMenuView.node.id);
            var ruleIds = this.reactionOptionsMenuView.node.Rule;

            RuleModel.set('isExactMatches', false/*this.root['exact-match']*/);
            RuleModel.set('query-id', SynthesisModel.get('queryId'));
            RuleModel.set('predicted', this.model.get('predicted'));
            RuleModel.set('security-code', SynthesisModel.get('securityCode'));
            RuleModel.set('solution-id',
                (this.reactionOptionsMenuView.node.Product ? parseInt(this.reactionOptionsMenuView.node.Product)
                   : this.reactionOptionsMenuView.node.Reactant));
            RuleModel.set('rule-id', ruleIds);
            RuleModel.set('rule-count', ruleIds.length);
            RuleModel.set('similar-examples', this.reactionOptionsMenuView.node.examples);

            this.trigger('known-literature-shows');
        },

        /**
         * Triggers exact-known-literature-shows event for currentNode object
         * @method exactKnownLiteratureHandler
         */
        exactKnownLiteratureHandler: function() {

            LiteratureModel.unset('resultsetId');
            // this.decolorizeUnselectedLinks(this.reactionOptionsMenuView.node.id);
            RuleModel.unset('rule-id');
            RuleModel.set('isExactMatches', true);
            RuleModel.set('query-id', SynthesisModel.get('queryId'));
            RuleModel.set('predicted', this.model.get('predicted'));
            RuleModel.set('security-code', SynthesisModel.get('securityCode'));
            RuleModel.set('solution-id',
                (this.reactionOptionsMenuView.node.Product ? parseInt(this.reactionOptionsMenuView.node.Product)
                   : this.reactionOptionsMenuView.node.Reactant));
            RuleModel.set('similar-examples', this.reactionOptionsMenuView.node['exact-match']);
            RuleModel.set('tree-id', this.reactionOptionsMenuView.node['tr_id']);

            this.trigger('exact-known-literature-shows');
        },

        /**
         * Triggers show-alternative-grid event for currentNode object
         * @method showAlternativesGridView
         */
        showAlternativesGridView: function() {
            this.currentProductNodeId = this.reactionOptionsMenuView.node.Product;

            this.highlightReactionNodes(this.currentProductNodeId);
            this.decolorizeUnselectedLinks(this.reactionOptionsMenuView.node.id);

            this.trigger('show-alternative-grid', this.currentNode);
        },

        /**
         * Toggles molecule and reaction options menus in the tree
         * @method showMenuHandler
         * @param evt {Object} The click event
         */
        showMenuHandler: function(evt) {
            if (evt) {
                evt.preventDefault();
            }
            var nodeId = this.$el.find(evt.currentTarget).parents('.node').attr('id');
            var node = this.node.filter('#' + nodeId).data()[0];
            var nodeOffsets = (this.$el.find(evt.currentTarget)).offset();
            var menuRole;
            if ($(evt.target).is('image.' + self.moleculeOptionSelector)) {
                menuRole = 'molecule';
            } else if ($(evt.target).is('image.' + self.rxnBubbleSelector)) {
                menuRole = 'reaction';
            }

            this.menuToggleHandler(node, nodeOffsets, menuRole);
        },

        /**
         * Toggles molecule and reaction options menus in the tree
         * @method menuToggleHandler
         * @param node {Object} tree node for which menu has to be shown
         * @param nodeOffsets {Object} top and left values where menu has to be rendered
         * @param role {String} molecule or reaction
         */
        menuToggleHandler: function(node, nodeOffsets, role) {
            var flagForNode = this.isCurrentElement(this.currentNode, node);
            var flagForRole = this.isSameRole(this.lastMenuShownFor, role);

            if (!flagForNode || (flagForNode && !flagForRole)) {

                if (role === 'molecule') {

                    this.showMoleculeMenu(node, nodeOffsets);
                } else if (role === 'reaction') {

                    this.showReactionMenu(node, nodeOffsets);
                }
                this.currentNode = node;
                this.lastMenuShownFor = role;
            } else {

                this.clearView(this.reactionOptionsMenuView);
                this.clearView(this.moleculeOptionsMenuView);
                this.currentNode = undefined;
                this.lastMenuShownFor = undefined;
            }
        },

        /**
         * Creates molecule option view for the given node and displays it on given offsets
         * @method showMoleculeMenu
         * @param node {Object} tree node for which menu has to be shown
         * @param nodeOffsets {Object} top and left values where menu has to be rendered
         */
        showMoleculeMenu: function(node, nodeOffsets) {

            if (!this.moleculeOptionsMenuView) {
                this.moleculeOptionsMenuView = new MoleculeOptionsMenuView();
            }

            this.stopListening(this.moleculeOptionsMenuView);

            this.moleculeOptionsMenuView.delegateEvents();
            this.listenTo(this.moleculeOptionsMenuView, 'restore-tree', this.startRescoreHandler, this);
            this.moleculeOptionsMenuView.node = node;
            this.moleculeOptionsMenuView.pos = nodeOffsets;

            var queryId = SynthesisModel.get('queryId');
            var securityCode = SynthesisModel.get('securityCode');
            var isPredicted = this.model.get('predicted');
            var isWithColorCodedBonds = (function(colorBondsDisplaySetting) {
                return !!(colorBondsDisplaySetting && colorBondsDisplaySetting.get('value'));
            }(DisplaySettingsCollection.get('colorCodeBonds')));

            this.moleculeOptionsMenuView.displayMenuForMolecule(
                queryId, securityCode, isPredicted, isWithColorCodedBonds);
        },

        /**
         * Creates reaction option view for the given node and displays it on given offsets
         * @method showReactionMenu
         * @param node {Object} tree node for which menu has to be shown
         * @param nodeOffsets {Object} top and left values where menu has to be rendered
         */
        showReactionMenu: function(node, nodeOffsets) {

            if (!this.reactionOptionsMenuView) {
                this.reactionOptionsMenuView = new ReactionOptionsMenuView();
            }

            this.stopListening(this.reactionOptionsMenuView);

            this.reactionOptionsMenuView.delegateEvents();

            this.listenTo(this.reactionOptionsMenuView, 'restore-tree', this.startRescoreHandler, this);
            this.listenTo(this.reactionOptionsMenuView, 'show-alternative', this.showAlternativesGridView, this);
            this.listenTo(this.reactionOptionsMenuView, 'known-literature', this.knownLiteratureHandler, this);
            this.listenTo(this.reactionOptionsMenuView, 'exact-known-literature',
                this.exactKnownLiteratureHandler, this);
            this.reactionOptionsMenuView.node = node;
            this.reactionOptionsMenuView.pos = nodeOffsets;
            this.reactionOptionsMenuView.displayMenuForReaction(this.model.get('predicted'));
        },

        /**
         * Checks if the menu role (molecule or reaction) is same as menu being displayed
         * @method isSameRole
         * @param oldRole
         * @param currentRole
         * @returns {boolean}
         */
        isSameRole: function(oldRole, currentRole) {

            if (oldRole && oldRole === currentRole) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * Hides tree molecule options/ reaction options on clicking on body and re-colors greyed-out tree links
         * @method hideMenuHandler
         * @param evt {Object} The click event
         */
        hideMenuHandler: function(evt) {

            var targetEl = evt.target;

            var moleculeOptionIcon = $(targetEl).is('image.' + self.moleculeOptionSelector);
            var reactionOptionIcon = $(targetEl).parents().andSelf()
                .is('.dropdown-options, image.' + self.rxnBubbleSelector);

            // Hide the legends
            var isWithinColorCodeLegend = $(targetEl).parents().andSelf().is('.colorCodeLegend');
            if (!isWithinColorCodeLegend) {
                self.$('.colorCodeLegend').removeClass('colorCodeLegend_isExpanded');
            }

            if (!moleculeOptionIcon) {
                if (self.moleculeOptionsMenuView && self.moleculeOptionsMenuView.$el.html() !== '') {
                    self.currentNode = undefined;
                    self.lastMenuShownFor = undefined;
                    self.clearView(self.moleculeOptionsMenuView);
                }
            }

            if (!reactionOptionIcon) {
                if (self.reactionOptionsMenuView && self.reactionOptionsMenuView.$el.html() !== '') {
                    self.currentNode = undefined;
                    self.lastMenuShownFor = undefined;
                    self.clearView(self.reactionOptionsMenuView);
                }
            }
        },

        updateTreeImages: function() {
            this.copyDisplayAttrsOntoView(); // Because decorators reference attrs as view.attr
            this.fetchImages(
                this.model.get('treeData').solutionIds,
                +SynthesisModel.get('queryId'),
                this.model.get('predicted'),
                SynthesisModel.get('securityCode'),
                function(imageData) {
                    this.imageMap = imageData; // Because decorators access images through view.imageMap
                    this.refreshMoleculeImages();
                }.bind(this));
        },

        // Apply the current display settings that are relevant to color-coding. Color-coding
        //  related display settings require a network fetch (at least for now, that the various
        //  versions of tree images are not cached) so they're in a class of their own. This method
        //  will specifically apply the show/hide color-coded bonds display setting
        applyCurrentColorCodingDisplaySettings: function() {
            var colorCodeBondsDisplaySetting = DisplaySettingsCollection.get('colorCodeBonds');
            if (!colorCodeBondsDisplaySetting) {
                return;
            }

            var colorCodeBondsSettingValue = colorCodeBondsDisplaySetting.get('value');

            if (this.lastKnownColorCodeBondsSettingValue === colorCodeBondsSettingValue) {
                return; // Don't do redundant work
            }

            this.lastKnownColorCodeBondsSettingValue = colorCodeBondsSettingValue;

            this.copyDisplayAttrsOntoView();
            this.$('.colorCodeLegend').toggleClass('colorCodeLegend_isHidden', !colorCodeBondsSettingValue);
            this.updateTreeImages();
        },

        // Will setup all the necessary plumbing needed to make the tree redraw whenever
        // any display preference preference is toggled
        setupTreeImageRedrawOnDisplaySettingsChange: function() {
            DisplaySettingsCollection.each(function(displaySetting) {
                this.stopListening(displaySetting, 'change:value');
                this.listenTo(displaySetting, 'change:value', function() {
                    this.copyDisplayAttrsOntoView();
                    if (displaySetting.id === 'colorCodeBonds') {
                        // Apply the current display settings that are relevant to color-coding
                        this.applyCurrentColorCodingDisplaySettings();
                    } else {
                        // Apply the current display settings that are _not_ relevant to color-coding
                        //  Specifically, apply the show/hide yields/prices display settings
                        this.copyDisplayAttrsOntoView();
                        this.drawNodes(this.currentProductNodeId);
                    }
                });
            }.bind(this));
        },

        onShow: function() {

            self = this;

            $('body').bind('click', this.hideMenuHandler);
            this.hideElement(this.$el.find('.sk-spinner'));
            this.solutionIds = [];

            this.setupTreeImageRedrawOnDisplaySettingsChange();

            GenericView.prototype.onShow.call(this);
            this.model.set('predicted', this.options.data.predicted);
            SynthesisModel.set('isPredicted', this.options.data.predicted);

            this.currentProductNodeId = this.options.data.alternateInfo && this.options.data.alternateInfo.Product;
            if (this.currentProductNodeId) {
                this.currentProductNodeId = '' + this.currentProductNodeId;
            } else {
                this.currentProductNodeId = null;
            }

            if ((this.options.data.children || this.options.data.isRestored) && !this.isRendered) {
                this.$('.colorCodeLegend').addClass('colorCodeLegend_isHidden');

                if (!this.rescoreSpinnerIsShown) {
                    this.showElement(this.$el.find('.sk-spinner'));
                }

                this.getRecursiveData(this.options.data);
            } else {
                this.model.set('treeData', this.options.data.cachedTreeData);
                this.root = this.model.get('treeData');
                this.updateTreeSvg();
            }
        },

        /**
         * Triggers tree re-scoring
         * @method startRescoreHandler
         * @param [alternateInfo] {Object} Optional parameter for alternates where tree is drawn from given node
         */
        startRescoreHandler: function(alternateInfo, nodeDepth) {

            if (!alternateInfo) {
                this.trigger('remove-tree-tabs');
            }
            this.setFocusOffsets();
            this.trigger('rescore-tree', this.model.get('predicted'), alternateInfo, nodeDepth);
        },

        /**
         * Shows the re-scoring message
         * @method showRestoreSuccessMessage
         */
        showRestoreSuccessMessage: function() {

            this.showElement(this.$el.find('.restore-message'));
            this.startHideTimeout();
        },

        /**
         * Starts the display timeout for re-scoring message
         * @method startHideTimeout
         */
        startHideTimeout: function() {

            this.clearHideTimeout();
            this.hideTimeout = setTimeout(function() {

                this.hideElement(this.$el.find('.restore-message'));
            }.bind(this), this.RESCORE_MODAL_TIME);
        },

        /**
         * Clears the display timeout for re-scoring message
         * @method clearHideTimeout
         */
        clearHideTimeout: function() {

            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
        },

        /**
         * Saves the scroll x, y co-ordinates to focus on, when re-rendering the tree
         * @method setFocusOffsets
         */
        setFocusOffsets: function() {
            if (this.treeScroll) {
                var focusOnOffsets = {x: this.treeScroll.x, y: this.treeScroll.y};
                SynthesisModel.set('activeNodeOffsets', focusOnOffsets);
            }
        },

        /**
         * Creates tr_ids list for selected alternate and sets it in RouteInfoModel
         * @method getTrIds
         * @param alternateInfo {Object}
         */
        getTrIds: function(alternateInfo) {
            var list = [];

            this.nodes.forEach(function(d) {
                if (d['tr_id']) {
                    list.push(d['tr_id']);
                }
            });
            if (alternateInfo) {
                RouteInfoModel.set('tree', list);
            }
        },

        refreshIScroll: function() {
            setTimeout(function() {
                self.treeScroll.refresh();
                self.$el.find('.synthesis-tree-container').removeClass('grabbable');
                if (self.treeScroll.hasVerticalScroll || self.treeScroll.hasHorizontalScroll) {
                    self.$el.find('.synthesis-tree-container').addClass('grabbable');
                }
            }, 2000);
        }
    });
});
