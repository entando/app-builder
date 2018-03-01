import { createSelector } from 'reselect';

export const getFragmentForm = state => state.fragmentForm;

export const getFragmentValues = createSelector(
  [getFragmentForm],
  fragmentForm => fragmentForm.fragmentValues,
);
