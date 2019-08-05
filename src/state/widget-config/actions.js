import { addErrors } from '@entando/messages';

import { putPageWidget } from 'api/pages';
import { loadSelectedPage } from 'state/pages/actions';
import { loadSelectedPageModel } from 'state/page-models/actions';
import { loadSelectedWidget } from 'state/widgets/actions';
import { history, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { routeConverter } from 'helpers/routeConverter';


export const updateConfiguredPageWidget = (widgetConfig, params) =>
  (dispatch) => {
    const { pageCode, widgetCode, framePos } = params;
    const framePosNum = parseInt(framePos, 10);
    // build payload
    const requestBody = {
      code: widgetCode,
      config: widgetConfig,
    };
    return putPageWidget(pageCode, framePosNum, requestBody)
      .then(response =>
        response.json().then((json) => {
          if (response.ok) {
            history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
          } else {
            dispatch(addErrors(json.errors.map(e => e.message)));
          }
        })).catch(() => {});
  };


export const initWidgetConfigPage = (pageCode, widgetCode) => async (dispatch) => {
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
