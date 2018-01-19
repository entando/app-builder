import { createSelector } from 'reselect';

export const getLocalState = state => state.helloWorld;

export const getHelloWorldMessage = createSelector(
  [getLocalState],
  localState => localState.message,
);
