define(function(require){
	'use strict';
	var combineReducers = require('redux').combineReducers;

    var SynthesisOptsReducers = function(){
        return {
            tabover: -1,
            active: 0
        }
    };

    var hoverReducer = function (state = null, action) {
        switch (action.type) {
            case 'MOUSE_OVER_TAB':
                return action.payload;
                break;
            case 'MOUSE_OUT_TAB':
                return action.payload;
                break;
        }
        return state;
    };
    var clickReducer = function (state = null, action) {
        switch (action.type) {
            case 'MOUSE_CLICK_TAB':
                return action.payload;
                break;
        }
        return state;
    };


	const allReducers = combineReducers({
	    syntOption: SynthesisOptsReducers,
        hover: hoverReducer,
        clicked: clickReducer
	});

	return allReducers;
});
