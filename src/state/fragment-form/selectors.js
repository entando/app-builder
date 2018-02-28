import { createSelector } from 'reselect';

export const getFragmentForm = state => state.fragmentForm;

export const getFragmentValues = createSelector(
  [getFragmentForm],
  fragmentForm => fragmentForm.fragmentValues,
);

export const getFragments = createSelector(
  [getFragmentValues],
  fragmentValues => fragmentValues.fragments,
);

export const getPageModels = createSelector(
  [getFragmentValues],
  fragmentValues => fragmentValues.pageModels,
);

export const getWidgetType = createSelector(
  [getFragmentValues],
  fragmentValues => fragmentValues.widgetType,
);

export const getPluginCode = createSelector(
  [getFragmentValues],
  fragmentValues => fragmentValues.pluginCode,
);
