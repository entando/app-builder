import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
// eslint-disable-next-line no-unused-vars
import { getFormValues, isDirty, isInvalid, isSubmitting, submit } from 'redux-form';

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
import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import { SIMPLE_WIDGET_CONFIG_FORM_ID } from 'ui/widgets/config/forms/SimpleWidgetConfigForm';

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: ({ widgetConfig }) => {
    const { pageCode, widgetCode, framePos } = params;
    if (widgetConfig) {
      dispatch(initWidgetConfigPage(pageCode, widgetCode, parseInt(framePos, 10)));
    } else {
      dispatch(initWidgetConfigPageWithConfigData(pageCode, widgetCode, parseInt(framePos, 10)));
    }
  },
  onSubmit: (widgetConfig, formId, beforeSubmit) => {
    // console.log('widgetConfig', widgetConfig);
    // console.log('formId', formId);
    // console.log('beforeSubmit', beforeSubmit);
    if (formId && beforeSubmit) {
      beforeSubmit(dispatch, widgetConfig).then((res) => {
        dispatch(updateConfiguredPageWidget(res, params));
      });
    } else {
      dispatch(updateConfiguredPageWidget(widgetConfig, params));
    }
  },
  onSave: () => {
    // dispatch(setAppTourLastStep(17));
    // dispatch(setVisibleModal(''));
    // dispatch(submit(NavigationBarWidgetID));
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
  const appBuilderForm = getAppBuilderWidgetForm(widget);

  const reduxFormId = appBuilderForm && appBuilderForm.reduxFormId;
  const dirty = reduxFormId && isDirty(appBuilderForm.reduxFormId)(state);
  const invalid = reduxFormId && isInvalid(appBuilderForm.reduxFormId)(state);
  const submitting = reduxFormId && isSubmitting(appBuilderForm.reduxFormId)(state);
  const beforeSubmit = reduxFormId && appBuilderForm.beforeSubmit;

  // TODO also should be here microftontend form id
  const formId = reduxFormId || SIMPLE_WIDGET_CONFIG_FORM_ID;

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
