define(function(require) {
    'use strict';
    var React = require('react');
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
                    <select className='synpStepsSection_input'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                </div>
            </div>
        );
    };
    return NumberOfSteps;
});
