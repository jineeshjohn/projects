// var RandomMessage = React.createClass({
//   getInitialState: function() {
//     return { message: 'Hello, Universe' };
//   },
//   onClick: function() {
//     var messages = ['Hello, World', 'Hello, Planet', 'Hello, Universe'];
//     var randomMessage = messages[Math.floor((Math.random() * 3))];

//     this.setState({ message: randomMessage });
//   },
//   render: function() {
//     return (
//       <div>
//         <MessageView message={ this.state.message }/>
//         <p><input type="button" onClick={ this.onClick } value="Change Message"/></p>
//       </div>
//     );
//   }
// });





var Fish = (props) => {
	return <div>{props.message}, Salmon</div>
}
var Button = () => {
	onClick: function(){

	},
	return <button>Make the Fish dance :) </button>
}
var Pond = () => {
	return (
		<div id='pond'>
			<Fish />
			<Button />
		</div>
	);
}



  ReactDOM.render(
    <Pond />,
    document.getElementById('container')
  );


