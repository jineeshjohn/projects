define(function(require) {

    var types =  require('../actions/action-types');

    function loadSearchLayout(searchType, title) {
        return {
            type: types.LOAD_SEARCH_LAYOUT,
            searchType,
            title
        };
    }
    return {
    	loadSearchLayout: loadSearchLayout
    };

});
