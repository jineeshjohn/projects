define(function(require) {

    var React = require('react');
    var Page = require('es6!./pages/page-list');

    var App = function() {
        return (
            <div>
                 <Page />
            </div>
        );
    }

    return App;
});
