import { Redux, ReactRouterRedux } from 'src/vendor';
import { reducer as formReducer } from 'redux-form';
import reducers from 'src/reducers';

const {createStore, combineReducers} = Redux;
const {routerReducer} = ReactRouterRedux;

const store = createStore(
    combineReducers({
        ...reducers,
        form: formReducer,
        routing: routerReducer
    })
);

export default store;
