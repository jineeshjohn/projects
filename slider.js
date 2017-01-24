
// The Email Preference Section View allows the user to set the global email preference
define(function(require) {
    'use strict';

    var GenericView = require('generic.view');
    require('hbs.helpers');
    var SynpScoringProfileSection = GenericView.extend({
        tpl: require('text!components/component-synthesis-plan-configurator/views/scoring-profile-section/scoring-profile-section.html'),
        className: 'synpScoringProfileSection',

        events: {
            'click .synpScoringProfileSection_synpRadioBtn, .synpScoringProfileSection_synpRadioBtn_label': '_setScoringProfile',
            'mousedown .slider': '_initSlider'
        },

        constructor: function SynpScoringProfileSection() {
            return GenericView.prototype.constructor.apply(this, arguments);
        },

        initialize: function(opts) {
            this._scoringProfile = opts.scoringProfile;
            $(document).on('mousedown', this._disableSelect);
            return GenericView.prototype.initialize.apply(this, arguments);
        },

        render: function() {
            this.setDataToRender({
                userSelectedProfile: this._scoringProfile.get('selectedProfile'),
                startingMaterialAvailability: this._scoringProfile.get('startingMaterialAvailability'),
                exactMatches: this._scoringProfile.get('exactMatches'),
                startingMaterialPrice: this._scoringProfile.get('startingMaterialPrice'),
                yieldPercentage: this._scoringProfile.get('yieldPercentage'),
                literatureExamples: this._scoringProfile.get('literatureExamples'),
                wastagePercentage: this._scoringProfile.get('wastagePercentage')
            });

            return GenericView.prototype.render.apply(this, arguments);
        },

        _setScoringProfile: function(evt) {
           this._scoringProfile.set('selectedProfile', $(evt.target).closest('[data-scoring-profile]').data('scoringProfile'));
           this.render();
        },

        _initSlider: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            this._currentSlider = $(evt.target).data('scoringParametersOption');
            evt.target.self = this;
            evt.target._isSliding = true;
            evt.target._offsetLeft = -($(evt.target).width() / 2);
            evt.target._offsetRight = $(evt.target).parent().width() - $(evt.target).width() + ($(evt.target).width() / 2);

            $(document).on('mousemove', this._setSliderPosition.bind(evt.target));
            $(document).on('mouseup', this._snapSlider.bind(evt.target));
        },

        _setSliderPosition: function(evt) {

            if (!this._isSliding) {
                return;
            }

            var clientX = evt.pageX - $(this).parent().offset().left - ($(this).width() / 2);
            clientX = clientX < this._offsetLeft ? this._offsetLeft : clientX;
            clientX = clientX > this._offsetRight ? this._offsetRight : clientX;

            $(this).css({left: clientX});
            $(this).next('div').width(clientX);
        },

        _disableSelect: function() {
            return false;
        },

        _snapSlider: function() {
            this._isSliding = false;
            var left = parseFloat($(this).css('left'));
            var arr = [];

            $(this).nextAll('.scoring_parameters_options_circles').children('.circle').each(function() {
                var obj = {
                    key: $(this).data('key'),
                    value: $(this).data('value'),
                    left: parseFloat($(this).css('left'))
                };

                arr.push(obj);
            });

            var closest = arr.reduce(function (prev, curr) {
                return (Math.abs(curr.left - left) < Math.abs(prev.left - left) ? curr : prev);
            });


            closest.left = closest.left === 0 ? -($(this).width() / 2) : closest.left;
            closest.left = Math.round(closest.left) === ($(this).parent().width() - $(this).width()) ? closest.left + ($(this).width() / 2) : closest.left;

            $(this).css({left:  closest.left});
            $(this).next('div').width(closest.left);
            this.self._setScoringParameters(closest)

        },

        _setScoringParameters: function(param) {
            this._scoringProfile.set(param.key, param.value);
        }
    });

    return SynpScoringProfileSection;
});
