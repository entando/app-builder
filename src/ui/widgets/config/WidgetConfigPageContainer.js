import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';
import { getMicrofrontend } from 'helpers/microfrontends';
import { getFormValues } from 'redux-form';

import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';

import { getSelectedWidget } from 'state/widgets/selectors';
import { makeGetWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage, initWidgetConfigPageWithConfigData } from 'state/widget-config/actions';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';
import { setVisibleModal } from 'state/modal/actions';
import { routeConverter } from '@entando/utils';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { getWidgetFormProperties } from 'ui/widgets/edit/EditWidgetFormContainer';
import { setAppTourLastStep } from 'state/app-tour/actions';

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: ({ widgetConfig }) => {
    const { pageCode, widgetCode, framePos } = params;
    if (widgetConfig) {
      dispatch(initWidgetConfigPage(pageCode, widgetCode, parseInt(framePos, 10)));
    } else {
      dispatch(initWidgetConfigPageWithConfigData(pageCode, widgetCode, parseInt(framePos, 10)));
    }
  },
  onSubmit: ({
    widgetConfig, formId, beforeSubmit, isMfe, widget,
  }) => {
    dispatch(setVisibleModal(''));
    if (isMfe) {
      const customElement = get(widget, 'configUi.customElement');
      const configWebComponent = getMicrofrontend(customElement);
      const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
      dispatch(updateConfiguredPageWidget(updatedWidgetConfig, params));
    } else if (formId && beforeSubmit) {
      dispatch(setAppTourLastStep(17));
      beforeSubmit(dispatch, widgetConfig).then((res) => {
        dispatch(updateConfiguredPageWidget(res, params));
      });
    } else {
      dispatch(updateConfiguredPageWidget(widgetConfig, params));
    }
  },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => {
    dispatch(setVisibleModal(''));
    const { pageCode } = params;
    history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
  },
});

export const mapStateToProps = (state, { match: { params } }) => {
  const { pageCode, framePos, widgetCode } = params;

  const getPageWidgetConfig = (st) => {
    const pageConfig = st.pageConfig.configMap[pageCode];
    const widgetConfig = pageConfig ? pageConfig[parseInt(framePos, 10)] : null;
    return widgetConfig ? widgetConfig.config : null;
  };

  const widget = getSelectedWidget(state);

  const {
    formId, beforeSubmit, widgetConfigDirty: dirty, widgetConfigInvalid: invalid,
    widgetConfigSubmitting: submitting, isMfe,
  } =
   getWidgetFormProperties(widget, state);

  return {
    widgetCode,
    widget,
    widgetConfig: getPageWidgetConfig(state),
    framePos: parseInt(framePos, 10),
    pageCode,
    frameName: makeGetWidgetConfigFrameName(framePos)(state),
    appTourProgress: getAppTourProgress(state),
    dirty,
    invalid,
    submitting,
    beforeSubmit,
    formId,
    formWidgetConfig: getFormValues(formId)(state),
    isMfe,
  };
};


export default withRouter(injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(withPermissions(MANAGE_PAGES_PERMISSION)(WidgetConfigPage))));
