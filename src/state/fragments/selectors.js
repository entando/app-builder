import { createSelector } from 'reselect';

export const getFragments = state => state.fragments;

export const getFragmentList = createSelector(
  getFragments,
  fragments => fragments.list,
);

export const getFragmentSelected = createSelector(
  [getFragments],
  fragment => fragment.selected,
);
