define(function(require){
  var React = require('react');
  var connect  = require('react-redux').connect;
  var WidgetList = require('../views/widget-list');
  var widgetApi = require('../../api/widget-api');
  var store = require('../../store');
  var loadSearchLayout  = require('../../actions/search-layout-actions').loadSearchLayout;

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
