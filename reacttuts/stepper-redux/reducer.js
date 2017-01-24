define(function(require) {
    'use strict';
    var combineReducers = require('redux').combineReducers;
    var initialState = {
        username: 'Lalu',
        page: 0
    };
    var StepReducer = function(state = initialState, action) {
        switch (action.type) {
            case 'VIEW_PAGE':
                return Object.assign({}, state, {pageData: action.pageData});
                break;
            case 'FINAL_PAGE':
                return Object.assign({}, state, {pageData: action.pageData});
                break;
        }
        return state;
    };
    const allReducers = combineReducers({
        pageData: StepReducer
    });

    return allReducers;
});
