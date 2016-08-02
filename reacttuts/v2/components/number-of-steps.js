define(function(require) {
    'use strict';
    var React = require('react');
    var connect = require('react-redux').connect;


    var getOptionList = function(dispatch){
        console.log(9999,arguments);
        setTimeout(function(){
            return dispatch({
                type:"NEW_OPTIONS_LIST",
                payload:['a','b','c']
            })
        }, 1000);

        return{
            type:'OPTIONS_LOADING'
        }
    }
    var NumberOfSteps = function(props) {
        return (
            <div>
                <div className='synpStepsSection_title'>Number of steps</div>
                <p className='synpStepsSection_instructions'>
                    Set a limit for the longest pathway in a synthetic scheme.
                    <br />
                    <a className='synpStepsSectionLink' target='_blank' href='https://chemplanner.zendesk.com/hc/en-us/articles/202938591'>Learn more about synthetic depth.</a>
                </p>
                <div className='synpStepsSection_inputSection'>
                    <select className='synpStepsSection_input' onChange={props.getOptionList}>
                        {props.options.map(function(key,val){
                            return <option key={key} value={key}>{val}</option>
                        })}
                    </select>
                </div>
            </div>
        );
    };
    function mapStateToProps(state) {
        return {
            options: state.options
        };
    }
    function matchDispatchToProps(dispatch){
        return {getOptionList: getOptionList.bind(null, dispatch)}
    }
    return connect(mapStateToProps, matchDispatchToProps)(NumberOfSteps);
});
