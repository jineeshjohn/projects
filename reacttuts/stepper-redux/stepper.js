define(function(require) {
	'use strict';
	var React = require('react');
	var Stepper = function(props){
		var btnCurrentState = [
			{isPrevDisabled: true, isNextDisabled: false},
			{isPrevDisabled: false, isNextDisabled: false},
			{isPrevDisabled: false, isNextDisabled: true}
		][props.page];

		return(
			<div>
				<button type="button"  className='btn'
				disabled={btnCurrentState.isPrevDisabled}
				onClick={props.previousPage}> Previous page </button>

				<button type="button"  className='btn'
				disabled={btnCurrentState.isNextDisabled}
				onClick={props.nextPage}> Next page </button>
			</div>
		);
	};
	return Stepper;
});
