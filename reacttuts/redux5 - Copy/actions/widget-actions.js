define(function(require) {
    var   types =  require('../actions/action-types');

    function getWidgetsSuccess(widgets) {
        return {
            type: types.GET_WIDGETS_SUCCESS,
            widgets
        };
    }

    function deleteWidgetSuccess(widgetId) {
        return {
            type: types.DELETE_WIDGET_SUCCESS,
            widgetId
        };
    }
    return{
    	getWidgetsSuccess: getWidgetsSuccess,
    	deleteWidgetSuccess: deleteWidgetSuccess,
    }
});
