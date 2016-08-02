define(function(require){
  var React = require('react');
  var connect  = require('react-redux').connect;
  var WidgetList = require('es6!../views/widget-list');
  var widgetApi = require('es6!../../api/widget-api');
  var store = require('es6!../../store');
  var loadSearchLayout  = require('es6!../../actions/search-layout-actions').loadSearchLayout;

  const WidgetListContainer = React.createClass({

    componentDidMount: function() {
      widgetApi.getWidgets();
      store.dispatch(loadSearchLayout('widgets', 'Widget Results'));
    },

    render: function() {
      return (
        <WidgetList widgets={this.props.widgets} deleteWidget={widgetApi.deleteWidget} />
      );
    }

  });

  const mapStateToProps = function(store) {
    return {
      widgets: store.widgetState.widgets
    };
  };

  return connect(mapStateToProps)(WidgetListContainer);
});
