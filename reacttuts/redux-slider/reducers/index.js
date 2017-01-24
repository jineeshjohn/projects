define(function(require) {
    var { combineReducers } = require( 'redux');

    const initialState = {
        searchType: 'home',
        title: 'This is home',
        page:'home'
    };

    const searchLayoutReducer = function(state = initialState, action) {

        switch (action.type) {

            case 'LOAD_CURRENT_PAGE':
                return Object.assign({}, state,  action);

        }

        return state;

    }
    // Combine Reducers
    var reducers = combineReducers({
        initialLayoutState: searchLayoutReducer
    });

    return reducers;

});
