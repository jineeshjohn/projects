define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var ProductImage = require('es6!./product-image');

    // Product list item
    var Product = React.createClass({
        getInitialState: function() {
            return {
                showImage: false
            };
        },

        getDefaultProps: function() {
            return {
                showImage: false
            };
        },

        componentWillMount: function() {
            // allow image display override
            if (this.props.showImage) {
                setShowImage(true);
            }
        },

        updateImagePosition: function(top, height) {
            // image is already displayed, no need to check anything
            if (this.state.showImage) {
                return;
            }

            // update showImage state if component element is in the viewport
            var min = this.props.viewport.top;
            var max = this.props.viewport.top + this.props.viewport.height;

            if ((min <= (top + height) && top <= (max))) {
                this.setShowImage(true);
            }
        },

        setShowImage: function(show) {
            this.setState({
                showImage: !!(show)
            });
        },

        render: function() {
            return (
                <div>
                    <h2>{this.props.title}</h2>
                    <div>
                        <ProductImage src={this.props.image} alt={this.props.title} viewport={this.props.viewport} showImage={this.state.showImage}
                            updateImagePosition={this.updateImagePosition} />
                    </div>
                </div>
            );
        }
    });

    return Product;
});
