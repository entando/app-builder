import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';
import { routeConverter } from '@entando/utils';

import { putPageWidget } from 'api/pages';
import { loadSelectedPage } from 'state/pages/actions';
import { loadSelectedPageTemplate } from 'state/page-templates/actions';
import { fetchPageConfig, setPublishedPageConfig } from 'state/page-config/actions';
import { loadSelectedWidget } from 'state/widgets/thunks';
import { history, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED } from 'state/pages/const';


export const updateConfiguredPageWidget = (widgetConfig, params) =>
  dispatch => new Promise((resolve) => {
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
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
          resolve(json);
        })).catch(() => {});
  });


export const initWidgetConfigPage = (pageCode, widgetCode) => async (dispatch) => {
  const selectedPage = await dispatch(loadSelectedPage(pageCode));
  if (!selectedPage) {
    return;
  }

  const pageTemplate = await dispatch(loadSelectedPageTemplate(selectedPage.pageModel));
  if (!pageTemplate) {
    return;
  }

  dispatch(loadSelectedWidget(widgetCode));
};

export const initWidgetConfigPageWithConfigData = (pageCode, widgetCode) => async (dispatch) => {
  const selectedPage = await dispatch(loadSelectedPage(pageCode));
  if (!selectedPage) {
    return;
  }

  const pageTemplate = await dispatch(loadSelectedPageTemplate(selectedPage.pageModel));
  if (!pageTemplate) {
    return;
  }
  dispatch(loadSelectedWidget(widgetCode));
  dispatch(fetchPageConfig(pageCode, PAGE_STATUS_DRAFT));
  if (selectedPage.status === PAGE_STATUS_PUBLISHED) {
    dispatch(fetchPageConfig(pageCode, PAGE_STATUS_PUBLISHED));
  } else {
    dispatch(setPublishedPageConfig(pageCode, null));
  }
};
