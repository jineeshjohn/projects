define(function(require) {

    var axios = require('axios');
    var store = require('../store');
    var { getWidgetsSuccess, deleteWidgetSuccess } = require('../actions/widget-actions');

    /**
     * Get widgets
     */

    function getWidgets() {
        return axios.get('http://localhost:3001/widgets')
            .then(response => {
                store.dispatch(getWidgetsSuccess(response.data));
                return response;
            });
    }

    /**
     * Search Widgets
     */

    function searchWidgets(query = '') {
        return axios.get('http://localhost:3001/widgets?q=' + query)
            .then(response => {
                store.dispatch(getWidgetsSuccess(response.data));
                return response;
            });
    }

    /**
     * Delete a widget
     */

    function deleteWidget(widgetId) {
        return axios.delete('http://localhost:3001/widgets/' + widgetId)
            .then(response => {
                store.dispatch(deleteWidgetSuccess(widgetId));
                return response;
            });
    }
    return{
        getWidgets: getWidgets,
        searchWidgets: searchWidgets,
        deleteWidget: deleteWidget
    }
});
