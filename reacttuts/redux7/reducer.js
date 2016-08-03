define(function(require) {
	var combineReducers = require('redux').combineReducers;
    const initialState = {
        msg: "Welcome to Dynamic application development..."
    };

    function basicReducer(state = initialState, action){
    	var currentState = state;
    	switch(action.type) {
    		case "BUTTON_ONE_CLICKED" :
	   			return Object.assign({}, state, {msg: "Clicked on Button One"});
			case "BUTTON_TWO_CLICKED" :
	   			return Object.assign({}, state, {msg: "Clicked on Button Two"});
			case "BUTTON_THREE_CLICKED" :
				return Object.assign({}, state, {msg: "Clicked on Button Three"});
    	}
    	return state;
    }
    return combineReducers({
    	initialPageState: basicReducer
    });

});
