import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'state/rootReducer';
import persistState from 'redux-localstorage';
import apps from 'entando-apps';

const localStorageStates = {
  locale: [],
  permissions: ['loggedUser'],
  apps: {},
};

apps.forEach((app) => {
  const { persistData = {}, id } = app;
  const appState = {};
  Object.keys(persistData).forEach((k) => { appState[k] = persistData[k]; });
  localStorageStates.apps[id] = appState;
});

const composeParams = [
  applyMiddleware(thunk),
  persistState(
    Object.keys(localStorageStates),
    {
      slicer: paths => state => (
        paths.reduce((acc, curr) => {
          const localState = localStorageStates[curr];
          acc[curr] = localState.length
            ? localState.reduce((accLocState, currLocState) => ({
              ...accLocState,
              [currLocState]: state[curr][currLocState],
            }), {})
            : state[curr];
          return acc;
        }, {})
      ),
    },
  ),
];

// enables Redux devtools extension if present
// eslint-disable-next-line
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // eslint-disable-next-line
  composeParams.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  rootReducer,
  undefined, // preloaded state
  // eslint-disable-next-line
  compose(...composeParams),
);

export default store;
