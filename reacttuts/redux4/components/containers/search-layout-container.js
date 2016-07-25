define(function(require) {

    var React = require('react');
    var connect  = require('react-redux').connect;
    var SearchLayout = require('../layouts/search-layout');

    const mapStateToProps = function(store) {

        let searchType = store.searchLayoutState.searchType;
        let totalResults = 0;

        if (searchType === 'users') {
            totalResults = store.userState.users.length;
        } else if (searchType === 'widgets') {
            totalResults = store.widgetState.widgets.length;
        }

        return {
            searchType,
            title: store.searchLayoutState.title,
            totalResults
        };

    };

    return connect(mapStateToProps)(SearchLayout);
});
