define(function(require) {
    var React = require('react'); 
    
    var CimeMapContainer = require('es6!./pages/crime-map-container');
    var App = function() {
        return (
            <div>
                 <CimeMapContainer />
            </div>
        );
    }
    return App;
});
