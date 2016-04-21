/**
 * Using  normal function
 * debugger statements
 */
function getData(){

	debugger;
	console.log('Meyavoo');
	return 12;
};

// Here 'props' is a Object
// To grab a property out of object use {{style}} here
var Aquarium = (props) => {
	var jj = 10;
	var kk = getData();
	return <div>JJ {props.species}</div>;
}


ReactDOM.render(  <Aquarium style='color:red;' species="rainbowfish" /> ,
  document.getElementById('container')
);