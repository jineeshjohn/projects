define(function(require){

var React = require('react');
var Link  = require('react-router').Link;

// Using "Stateless Functional Components"
return   function(props) {
  return (
    <div className="data-list">

      {props.widgets.map(widget => {

        return (
          <div key={widget.id} className="data-list-item">
            <div className="details">{widget.name}</div>
            <div className="controls">
              <button onClick={props.deleteWidget.bind(null, widget.id)} className="delete">Delete</button>
            </div>
          </div>
        );

      })}

    </div>
  );
}
});