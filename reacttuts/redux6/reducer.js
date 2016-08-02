define(function(require) {
    var { combineReducers } = require( 'redux');

    const initialState = {
        msg: "Welcome to Dynamic application development"
    };

    const initialPageState = function(state = initialState, action) {
        switch (action.type) {
            case 'WELCOME_STATE':
                return Object.assign({}, state,  action);
        }
        return state;
    }

    var reducers = combineReducers({
        initialPageState: initialPageState
    });

    return reducers;

});
