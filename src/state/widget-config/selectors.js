import { createSelector } from 'reselect';

import { getSelectedPageTemplate } from 'state/page-templates/selectors';

// eslint-disable-next-line import/prefer-default-export
export const makeGetWidgetConfigFrameName = framePos => createSelector(
  [getSelectedPageTemplate],
  (selectedPageTemplate) => {
    if (selectedPageTemplate) {
      if (framePos) {
        return selectedPageTemplate.configuration.frames[framePos].descr;
      }
    }
    return '';
  },
);
