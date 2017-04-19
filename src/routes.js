import {React, ReactRouter, ReactRouterRedux, Provider} from 'src/vendor';
import store from 'src/store';
import App from 'src/components/App';

const {Router, Route, IndexRoute, Redirect, browserHistory} = ReactRouter;
const {syncHistoryWithStore} = ReactRouterRedux;

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route component={App}>
                <Route path="/">
                    <IndexRoute component={require('src/components/SignUp').default} />
                </Route>
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>
);
