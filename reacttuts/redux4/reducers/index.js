define(function(require) {
    var { combineReducers } = require( 'redux');

    // Reducers
    var userReducer = require( './user-reducer');
    var widgetReducer = require( './widget-reducer');
    var searchLayoutReducer = require( './search-layout-reducer');

    // Combine Reducers
    var reducers = combineReducers({
        userState: userReducer,
        widgetState: widgetReducer,
        searchLayoutState: searchLayoutReducer
    });

    return reducers;

});
