define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Spinner = function() {
        return (
            <div style={{background: '#CCC', height: 200}}> Image is loading </div>
        )
    };

    // Product list item image
    var ProductImage = React.createClass({
        getDefaultProps: function() {
            return {
                isPageInViewport: false
            };
        },

        componentDidUpdate: function(prevProps) {
            // TODO prevProps.viewport
            if (!this.props.isPageInViewport && prevProps.viewport) {
                this.updatePosition();
            }
        },

        updatePosition: function() {
            var el = ReactDOM.findDOMNode(this);
            this.props.updatePagePosition(el.offsetTop, el.offsetHeight);
        },

        render: function() {
            var displayPages = (this.props.isPageInViewport) ? (
                <div style={{background: '#EEE', height: 200}}> page content {this.props.item} </div>
            ) : <Spinner />;
            return (
                <div> {displayPages} </div>
            );
        }
    });

    return ProductImage;

});
