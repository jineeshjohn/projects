
function Hello(){
  console.log('I am called jjjjjjjjjjjj ');
}

function Car(){
   return (
    <div>
    <h2>List of  Cars </h2>
    { <Honda click={Hello} />}
    </div>
  );
}

function Honda(props){
  return (
    <div onClick={props.click}> This is a honda car </div>
  );
}


ReactDOM.render(<Car /> ,   document.querySelector('#c1'));
ReactDOM.render(<Car /> ,   document.querySelector('#c2'));




