define(function(require) {

    var React = require('react');
    var Gallery = require('es6!./gallery/gallery');

    var App = function() {
        return (
            <div>
                <h3> Gallery app </h3>
                <Gallery />
            </div>
        );
    }

    return App;
});
