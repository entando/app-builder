import { initialize } from 'redux-form';
import { addErrors } from '@entando/messages';
import { routeConverter } from '@entando/utils';

import { putPageWidget } from 'api/pages';
import { loadSelectedWidget } from 'state/widgets/actions';
import { history, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { makeGetSelectedPageConfig } from 'state/page-config/selectors';
import { initConfigPage } from 'state/page-config/actions';
import { getWidgetFormConfig } from 'state/widget-config/selectors';
import { WIDGET_CONFIG_FORM_ID } from 'state/widget-config/const';

export const setWidgetFormConfig = config => initialize(WIDGET_CONFIG_FORM_ID, config);

export const updateConfiguredPageWidget = (widgetConfig, params) =>
  (dispatch) => {
    const { pageCode, widgetCode, framePos } = params;
    const framePosNum = parseInt(framePos, 10);
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
        })).catch(() => { });
  };

export const initWidgetConfigPage = (pageCode, widgetCode, framePos) =>
  async (dispatch, getState) => {
    const state = getState();
    if (!getWidgetFormConfig(state)) {
      await dispatch(initConfigPage(pageCode));
      const getSelectedPageConfig = makeGetSelectedPageConfig(pageCode);
      const pageConfig = getSelectedPageConfig(state);
      const pageConfigItem = (pageConfig && pageConfig[framePos]);
      if (pageConfigItem && pageConfigItem.config) {
        dispatch(setWidgetFormConfig(pageConfigItem.config));
      }
    }
    dispatch(loadSelectedWidget(widgetCode));
  };
