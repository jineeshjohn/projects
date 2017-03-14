define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var PageCover = require('es6!./page-cover')

    var PageList = React.createClass({
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
            var pages = [1,2,3,4,5,6,7,8,9].map(function(item, index){
                return <PageCover key={index} viewport={this.state.viewport} item={item} />
            }.bind(this));
            return (
                <div>
                        <p>some thing</p>
                        {pages}
                </div>
            );
        }
    });

    return PageList;

});
