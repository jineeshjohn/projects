define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var Spinner = function() {
        return (
            <div style={{background: '#CCC', height: 200}}> Image is loading </div>
        )
    };

    var PageList = React.createClass({
        getInitialState: function() {
            return {
                isPageInViewport: false
            }
        },
        getDefaultProps: function() {
            return {
                isPageInViewport: false
            };
        },
        componentDidUpdate: function(prevProps) {
            // TODO prevProps.viewport
            if (!this.props.isPageInViewport && prevProps.viewport) {
                con
                this.updatePagePosition();
            }
        },
        updatePagePosition: function() {
            var el = ReactDOM.findDOMNode(this);
            var elementTop = el.offsetTop;
            var elementHeight = el.offsetHeight;
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
            var displayPages = (this.state.isPageInViewport) ? (
                <div style={{background: '#EEE', height: 200}}> page content {this.props.item} </div>
            ) : <Spinner />;
            return (
                <div> {displayPages} </div>
            );
        }

    });

    return PageList;

});
