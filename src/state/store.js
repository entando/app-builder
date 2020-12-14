import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'state/rootReducer';
import persistState from 'redux-localstorage';
import apps from 'entando-apps';

const localStorageStates = {
  locale: [],
  permissions: ['loggedUser'],
  appTour: ['appTourProgress', 'lastStep'],
};

export const generatePersistedPathsForApps = (applications, defaultLocalStorageStates) => {
  const appsPersistedStates = applications.reduce((acc, curr) => {
    const { persistData = {}, id } = curr;

    return {
      ...acc,
      [id]: { ...persistData },
    };
  }, {});

  return { ...defaultLocalStorageStates, apps: appsPersistedStates };
};

const enhancedLocalStorageStates = generatePersistedPathsForApps(apps, localStorageStates);

export const getPersistedState = (state, path, localStorageState) => {
  const localStorageStateKeys = Object.keys(localStorageState);
  const emptyObj = !localStorageStateKeys.length;

  if (emptyObj) return state[path];

  if (localStorageState instanceof Array) {
    return localStorageState.reduce((accState, currentLocalStorageState) => ({
      ...accState,
      [currentLocalStorageState]: state[path][currentLocalStorageState],
    }), {});
  }

  return localStorageStateKeys.reduce((accState, currentLocalStorageStateKey) => ({
    ...accState,
    [currentLocalStorageStateKey]:
      getPersistedState(
        state[path],
        currentLocalStorageStateKey,
        localStorageState[currentLocalStorageStateKey],
      ),
  }), {});
};

const composeParams = [
  applyMiddleware(thunk),
  persistState(
    Object.keys(enhancedLocalStorageStates),
    {
      slicer: paths => state => (
        paths.reduce((acc, curr) => {
          const localStorageState = enhancedLocalStorageStates[curr];
          acc[curr] = getPersistedState(state, curr, localStorageState);
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
