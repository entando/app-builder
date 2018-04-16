import { createSelector } from 'reselect';
import { getParams } from '@entando/router';


import { getSelectedPageModel } from 'state/page-models/selectors';

// eslint-disable-next-line import/prefer-default-export
export const getWidgetConfigFrameName = createSelector(
  [getSelectedPageModel, getParams],
  (selectedPageModel, params) => {
    if (selectedPageModel) {
      if (params.framePos) {
        return selectedPageModel.configuration.frames[params.framePos].descr;
      }
    }
    return '';
  },
);
