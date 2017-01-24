
// var Greeting = React.createClass({
//   render: function() {
//     return (
//       <p>{this.props.message}</p>
//     );
//   }
// });




var FormInput = function(props){
	return (
		<div>
			<input type="text" onChange={props.validate} />
			<span>{props.msg}</span>
		</div>
	);
};


var FormContainer = React.createClass({
	getInitialState: function(){
		return{
			msg: 'ssss'
		};
	},
	getValidationConfig: function() {
			var rules = [{
			    pattern: /^[\s\t\r\n]*\S+/ig,
			    msg: 'messages.errors.price.empty'
			},
			// {
			//     maxLength: 80,
			//     msg: messages.errors.price.maxLength
			// },
			{
			    pattern: /^-?(?:\d*|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
			    msg: 'messages.errors.price.invalidDigit'
			},

			{
			    pattern: /^\s*(?=.*[1-9])([0-9]{0,7}(\.[0]+)?|[0-9]{0,6}[0-8]?(\.[0-9]+)?)\s*$/,
			    msg: 'messages.errors.price.range'
			},

			{
			    pattern: /^\s*([0-9]*(\.[0-9]{1,2})|\d{0,7}(\.[0])?|\d{0,7}(\.[0][0])?|\d+(\.[0-9]{1,2})?)\s*$/,
			    msg: 'messages.errors.price.twoDecimalPoints'
			}];
			return rules;
	},

	validate: function(e){
		var value = e.target.value;
		var rules = this.getValidationConfig();
		var msg= '';
		rules.some(function(rule,idx){
			if( !value.match(rule.pattern)){
				msg = rule.msg;
				return true;
			}

		});
		this.setState({msg: msg});
	},
	render: function(){
		return  <FormInput msg={this.state.msg} validate={this.validate}/>;
	}
});

ReactDOM.render(
	<FormContainer />,
	document.getElementById('container')
);
