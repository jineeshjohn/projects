define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Page = require('es6!./page')

    var PageList = React.createClass({
        getInitialState: function() {
            return {
                isPageInViewport: false
            }
        },
        updatePagePosition: function(elementTop, elementHeight) {
            // page is already displayed, no need to check anything
            if (this.state.isPageInViewport) {
                return;
            }

            // update isPageInViewport state if component element is in the viewport
            var scrolledHeight = this.props.viewport.top;
            var totalScrolledHeight = this.props.viewport.top + this.props.viewport.height;

            if ((scrolledHeight <= (elementTop + elementHeight) && elementTop <= (totalScrolledHeight - 200 ))) {
                this.setState({
                    isPageInViewport: true
                });
            }
        },
        
        render: function() {
            return (
                <Page updatePagePosition={this.updatePagePosition} viewport={this.props.viewport} isPageInViewport={this.state.isPageInViewport} />
            );
        }


    });

    return PageList;

});
