import { createSelector } from 'reselect';

export const getFragments = state => state.fragments;

export const getFragmentSelected = createSelector(
  [getFragments],
  fragment => fragment.selected,
);
