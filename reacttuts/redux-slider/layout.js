define(function(require){
    var React = require('react');
    var SliderItem = React.createClass({
        handleDrag: function(e) {

            e.target.style.left =  e.pageX;
            console.log(e);
        },
        render: function(){
            return(
                <div className="scoring_parameters_slider_section">
                    <div className="scoring_parameters_slider_title">Core Reduction Min Size</div>
                    <div id="scoring_option_39" data-id="39" name="scoring_option_39" className="scoring_profile_item">
                        <div className="slider">
                            <div className="slider_handle" onDragStart={this.handleDrag}></div>
                            <div className="slider_progress"></div>
                            <div className="slider_markers exclude">
                                <div className="slider_pointer"></div>
                                <div className="slider_label" data-key="0">EXCLUDE</div>
                            </div>
                            <div className="slider_markers low">
                                <div className="slider_pointer"></div>
                                <div className="slider_label" data-key="1">LOW</div>
                            </div>
                            <div className="slider_markers medium">
                                <div className="slider_pointer"></div>
                                <div className="slider_label highlighted" data-key="2">MEDIUM</div>
                            </div>
                            <div className="slider_markers high">
                                <div className="slider_pointer"></div>
                                <div className="slider_label" data-key="3">HIGH</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    function Layout(){

        return(
            <div className="scoring_parameters_wrapper ">
                <div className="scoring_parameters_title">Customize scoring parameters</div>
                <div className="scoring_parameters_slider_sections">
                    <SliderItem/>
                </div>
            </div>

        );
    }
    return Layout;
});