/**
 * Blur handler mixin
 * - to handle the blur event
 * @class BlurHandlerMixin
 * @uses $
 */
define(function(require) {

    'use strict';

    var $ = require('jquery');

    return {

        /**
         * to handle the blur event
         * @method blurFieldHandler
         * @param evt
         */
        blurFieldHandler: function(evt) {

            if (evt) {
                evt.preventDefault();
            }

            this.validateField($(evt.currentTarget));
        }
    };
});
