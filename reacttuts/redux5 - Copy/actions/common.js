define(function(require){

    var store = require('../store');


    function showThisPage(pageId) {
        store.dispatch({
	        searchType: pageId,
	        title: 'This is home',
	        page: pageId,
	        type:'LOAD_CURRENT_PAGE'
	    });
    }
    return {
    	showThisPage: showThisPage
    }
});