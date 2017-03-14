define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var jj = 0;
    var kk = 0;

    // Product list item image
    var ProductImage = React.createClass({
        getDefaultProps: function() {
            return {
                loader: 'loader.gif',
                showImage: false
            };
        },

        componentDidUpdate: function(prevProps) {
            if (!this.props.showImage ) {
                this.updatePosition();
                console.log('inif', )
            }else {
                console.log('else')
            }
        },

        updatePosition: function() {
            var el = ReactDOM.findDOMNode(this);
            this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
        },

        render: function() {
            var img = (this.props.showImage) ? this.props.src : this.props.loader;
            return (
                <img src={img} alt={this.props.alt} />
            );
        }
    });

    return ProductImage;

});
