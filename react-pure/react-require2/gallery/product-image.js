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
                showImage: false
            };
        },

        componentDidUpdate: function(prevProps) {
            if (!this.props.showImages && prevProps.viewport) {
                this.updatePosition();
            }
        },

        updatePosition: function() {
            var el = ReactDOM.findDOMNode(this);
            console.log(el);
            this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
        },

        render: function() {
            var images = (this.props.showImage) ? this.props.src.map(function(item, index){
                return (
                    <img key={index} src={item} />
                );
            }) : <Spinner />;
            return (
                <div> {images} </div>
            );
        }
    });

    return ProductImage;

});
