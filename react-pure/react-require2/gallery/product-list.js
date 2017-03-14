define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var Product = require('es6!./product');

    // Product list
    var ProductList = React.createClass({
        getInitialState: function() {
            return {
                viewport: {
                    top: 0,
                    height: 0
                }
            };
        },

        componentDidMount: function() {
            window.addEventListener('scroll', this.updateViewport, false);
            window.addEventListener('resize', this.updateViewport, false);
            this.updateViewport();
        },

        componentWillUnmount: function() {
            window.removeEventListener('scroll', this.updateViewport);
            window.removeEventListener('resize', this.updateViewport);
        },

        updateViewport: function() {
            // TODO: debounce this call
            this.setState({
                viewport: {
                    top: window.pageYOffset,
                    height: window.innerHeight
                }
            });
        },

        render: function() {
            var self = this;

            var itemViews = this.props.items.map(function(item, index) {
                return <Product key={index} title={item.title} image={item.image} viewport={self.state.viewport} />
            });

            return (
                <div>
                    <h1>Items</h1>
                    {itemViews}
                </div>
            );
        }
    });
    return ProductList;
});
