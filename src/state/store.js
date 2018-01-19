import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'state/rootReducer';


const store = createStore(
  rootReducer,
  undefined, // preloaded state
  // eslint-disable-next-line
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // eslint-disable-next-line
  ),
);

export default store;
