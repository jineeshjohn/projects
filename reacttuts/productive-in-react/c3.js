
function Hello(){
  console.log('I am called jjjjjjjjjjjj ');
}

function Car(){
   var applyBreak = function(){
      console.log('applying break!!!');
   }
   return <Honda break={applyBreak} />
}

function Honda(props){
  return <Button tiggerBreak={props.break} />
}

function Button(props){
  return (
    <button onClick={props.tiggerBreak}>  Set Break </button>
  );
}






ReactDOM.render(<Car /> ,   document.querySelector('#main'));


