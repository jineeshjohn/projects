define(function(require) {
    'use strict';
    var combineReducers = require('redux').combineReducers;

    var SynthesisOptsReducers = function(state = null, action) {
        switch (action.type) {
            case 'MOUSE_OVER_TAB':
                return { active: state.active, tabover: action.payload };
                break;
            case 'MOUSE_OUT_TAB':
                return { active: state.active, tabover: action.payload };
                break;
            case 'MOUSE_CLICK_TAB':
                return { active: action.payload, tabover: state.tabover };
                break;
            default:
                return { tabover: -1, active: 0 }
                break;
        }
        return state;
    };
    var StepsOptionsList = function(state = null, action) {
        switch (action.type) {
            case 'NEW_OPTIONS_LIST':
                return action.payload;
                break;
            default:
                return [ 1,2,3,4,5 ]
                break;
        }
        return state;
    };
    const allReducers = combineReducers({
        syntOption: SynthesisOptsReducers,
        options: StepsOptionsList
    });

    return allReducers;
});
