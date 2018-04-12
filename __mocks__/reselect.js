import { createSelectorCreator } from 'reselect';

// replacing createSelector to get a non-memoized version of the selectors (to be tested easily)
// eslint-disable-next-line
export const createSelector = createSelectorCreator(f => f);
