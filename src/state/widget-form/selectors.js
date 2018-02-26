import { createSelector } from 'reselect';

export const getWidgetForm = state => state.widgetForm;

export const getWidgetValues = createSelector(
  [getWidgetForm],
  widgetForm => widgetForm.widgetValues,
);

export const getWidgetName = createSelector(
  [getWidgetValues],
  widgetValues => widgetValues.name,
);
