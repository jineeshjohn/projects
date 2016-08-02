define(function(require){

    var React = require('react');
    var connect  = require('react-redux').connect;
    var Home = require('es6!../home');
    var UserListContainer = require('es6!../containers/user-list-container');
    var UserProfileContainer = require('es6!../containers/user-profile-container');
    var WidgetListContainer = require('es6!../containers/widget-list-container');
    var SearchFormContainer =  require('es6!../containers/search-form-container');

    var PageAction = require('es6!../../actions/common');
    function MainLayout(props) {
        var pages = {
            home: Home,
            users: UserListContainer,
            widgets: WidgetListContainer
        };
        var links = ['home', 'users', 'widgets'].map(function(key){
            return (
                <li key={key}><a onClick={PageAction.showThisPage.bind(null, key)} key={key}
                className={(props.initialState.page === key)?'active':''}>
                {key} </a>
                </li>
            );
        });
        var CurrentPage = pages[props.initialState.page];
        return (
            <div className="app">
                <aside className="primary-aside">
                      <ul> {links} </ul>
                </aside>
                <main>
                    <header className="search-header">
                      {props.title}
                      <SearchFormContainer searchType={props.searchType} />
                    </header>
                    <div className="search-results">
                        <CurrentPage  />
                    </div>
                </main>
            </div>
        );
    }
    function mapStateToProps(state){
        return {
            initialState: state.initialLayoutState,
            searchType: state.initialLayoutState.searchType
        }
    }
    return connect(mapStateToProps)(MainLayout);
});