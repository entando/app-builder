import { createSelector } from 'reselect';

import { getSelectedPageModel } from 'state/page-models/selectors';

// eslint-disable-next-line import/prefer-default-export
export const getWidgetConfigFrameName = framePos => createSelector(
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
