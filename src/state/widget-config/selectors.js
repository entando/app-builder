import { createSelector } from 'reselect';
import { getSelectedPageModel } from 'state/page-models/selectors';
import { getFormValues } from 'redux-form';
import { WIDGET_CONFIG_FORM_ID } from 'state/widget-config/const';

// eslint-disable-next-line import/prefer-default-export
export const makeGetWidgetConfigFrameName = framePos => createSelector(
  [getSelectedPageModel],
  (selectedPageModel) => {
    if (selectedPageModel) {
      if (framePos) {
        return selectedPageModel.configuration.frames[framePos].descr;
      }
    }
    return '';
  },
);

export const getWidgetFormConfig = getFormValues(WIDGET_CONFIG_FORM_ID);
