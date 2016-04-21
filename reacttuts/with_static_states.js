
// var Greeting = React.createClass({
//   render: function() {
//     return (
//       <p>{this.props.message}</p>
//     );
//   }
// });




var Aquarium = (props) => {
	return <div>JJ {props.message}</div>;
}


setInterval(function() {
  var messages = ['Hello, World', 'Hello, Planet', 'Hello, Universe'];
  var randomMessage = messages[Math.floor((Math.random() * 3))];
  ReactDOM.render(
    <Aquarium message={randomMessage}/>,
    document.getElementById('container')
  );
}, 2000);