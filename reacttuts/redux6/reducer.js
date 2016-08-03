define(function(require) {

    const initialState = {
        msg: "Welcome to Dynamic application development..."
    };

    function basicReducer(state = initialState, action){
        return {
            initialPageState: state
        };
    }

    return basicReducer;

});
