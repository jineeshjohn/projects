define(function(require) {

    var React = require('react');

    var userApi = require('../../api/user-api');
    var widgetApi = require('../../api/widget-api');
    var loadSearchLayout = require('../../actions/search-layout-actions').loadSearchLayout;
    var SearchForm = require('../views/search-form');

    const SearchFormContainer = React.createClass({

        search: function(event) {
            event.preventDefault();

            // By assigning a "child" ref to <SearchForm />, we
            // can use that reference to gain access to the
            // .getQuery() method. See the code for
            // <SearchForm /> to see how it returns a value.
            let query = this.refs.child.getQuery();

            if (this.props.searchType === 'users') {
                userApi.searchUsers(query);
            } else if (this.props.searchType === 'widgets') {
                widgetApi.searchWidgets(query);
            }
        },

        render: function() {
            return (
              <SearchForm search={ this.search } ref="child" />
            );
        }

    });

    return SearchFormContainer;
});
