define(function(require) {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var IScroll = require('iscroll');




    var PageList = React.createClass({

        getInitialState: function() {

            return {

            };
        },

        componentDidMount: function() {
            this.scroll = new IScroll('.alternativesPages_container', {
                scrollX: true,
                scrollbars: true,
                mouseWheel: false,
                bounce: false,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: false,
                snap: '.alternativeDepictionMol'
            });
            this.scroll.on('scrollEnd', function() {
                console.log('Test');
            });
        },

        componentWillUnmount: function() {

        },

        updateViewport: function() {

        },



        render: function() {

            return (
                <div className="alternativesPages_container">
                    <div className="alternativesPages alternativesPages_ribbonScroll" style={{width: "5128px"}}>
                        <div className="alternativesPages_ribbon">
                            <div className="alternativesPage">
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{width: "164px"}}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                            </div>
                            <div className="alternativesPage">
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                                <div id="1" className="alternativeDepictionMol alternativeDepictionMol_predicted" style={{ width: "164px" }}>
                                    <div className="alternativeDepictionMol_section">
                                        <div className="alternativeDepictionMol_index"></div>
                                        <div className="alternativeDepictionMol_img"> image </div>
                                    </div>
                                    <div className="alternativeDepictionMol_extraInfo"><span className="alternativeDepictionMol_contextMenuIcon icon-Ellipses"></span><span className="alternativeDepictionMol_type icon-Lightbulb"
                                        title="predicted transformation"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    return PageList;

});
