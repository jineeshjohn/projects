define(function(require){
	var React = require('react');
	var connect = require('react-redux').connect;
	var store = require('./store');
	function showWelcomeMsg(type){
		store.dispatch({type: type});
	}
	var Welcome = function(props){
		return (
			<div>
				<p>{props.msg}</p>
				<button onClick={showWelcomeMsg.bind(null,'BUTTON_ONE_CLICKED')}> Button 1</button>
				<button onClick={showWelcomeMsg.bind(null,'BUTTON_TWO_CLICKED')}> Button 2</button>
				<button onClick={showWelcomeMsg.bind(null,'BUTTON_THREE_CLICKED')}> Button 3</button>
			</div>

		)
	}
	function mapStateToProps(state){
		return{
			msg: state.initialPageState.msg
		}
	}
	return connect(mapStateToProps)(Welcome);
});
