import { getParams, gotoRoute } from '@entando/router';

import { addErrors } from 'state/errors/actions';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import { putPageWidget } from 'api/pages';
import { loadSelectedPage } from 'state/pages/actions';
import { loadSelectedPageModel } from 'state/page-models/actions';
import { loadSelectedWidget } from 'state/widgets/actions';


export const updateConfiguredPageWidget = widgetConfig =>
  (dispatch, getState) => {
    const state = getState();
    const { pageCode, widgetCode, framePos } = getParams(state);
    const framePosNum = parseInt(framePos, 10);
    // build payload
    const requestBody = {
      type: widgetCode,
      config: widgetConfig,
    };
    return putPageWidget(pageCode, framePosNum, requestBody)
      .then(response =>
        response.json().then((json) => {
          if (response.ok) {
            gotoRoute(ROUTE_PAGE_CONFIG, { pageCode });
          } else {
            dispatch(addErrors(json.errors.map(e => e.message)));
          }
        }));
  };


export const initWidgetConfigPage = () => async (dispatch, getState) => {
  const state = getState();
  const { pageCode, widgetCode } = getParams(state);

  // init selected page if not present
  const selectedPage = await dispatch(loadSelectedPage(pageCode));
  if (!selectedPage) {
    return;
  }

  const pageModel = await dispatch(loadSelectedPageModel(selectedPage.pageModel));
  if (!pageModel) {
    return;
  }

  dispatch(loadSelectedWidget(widgetCode));
};
