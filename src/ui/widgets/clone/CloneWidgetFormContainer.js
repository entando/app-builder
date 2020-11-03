import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { clearErrors } from '@entando/messages';
import { submit, reduxForm, getFormValues } from 'redux-form';
import { injectIntl } from 'react-intl';
import { WidgetFormBody } from 'ui/widgets/common/WidgetForm';
import { get } from 'lodash';
import { fetchLanguages } from 'state/languages/actions';
import { removePageWidget, updatePageWidget } from 'state/page-config/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getConfigMap } from 'state/page-config/selectors';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getSelectedWidgetDefaultUi, getSelectedParentWidget, getSelectedParentWidgetParameters } from 'state/widgets/selectors';
import { initNewUserWidget, sendPostWidgets } from 'state/widgets/actions';
import { initWidgetConfigPage, initWidgetConfigPageWithConfigData, updateConfiguredPageWidget } from 'state/widget-config/actions';
import { getLoading } from 'state/loading/selectors';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { convertConfigObject } from 'helpers/conversion';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { getWidgetFormProperties } from 'ui/widgets/edit/EditWidgetFormContainer';

const CONFIG_SIMPLE_PARAMETER = 'configSimpleParameter';
const MODE_CLONE = 'clone';

export const mapStateToProps = (state, { match: { params } }) => {
  const { pageCode, parentCode, frameId } = params;
  const pageConfig = getConfigMap(state) || {};
  const config = get(pageConfig, `${pageCode}.${frameId}.config`, {});
  const parentWidget = getSelectedParentWidget(state);
  const initialValues = {
    config,
    configUi: parentWidget && parentWidget.configUi ? JSON.parse(parentWidget.configUi) : null,
    parentType: parentCode,
  };
  const {
    formId, beforeSubmit, widgetConfigDirty, widgetConfigInvalid,
  } =
   getWidgetFormProperties(parentWidget, state);
  return ({
    mode: MODE_CLONE,
    groups: getGroupsList(state),
    parentWidget,
    config,
    parentWidgetParameters: getSelectedParentWidgetParameters(state),
    defaultUIField: getSelectedWidgetDefaultUi(state),
    languages: getActiveLanguages(state),
    loading: getLoading(state).fetchWidget,
    initialValues,
    formId,
    formWidgetConfig: getFormValues(formId)(state),
    beforeSubmit,
    widgetConfigDirty,
    widgetConfigInvalid,
  });
};

export const mapDispatchToProps = (dispatch, { history, match: { params } }) => ({
  onWillMount: ({ widgetConfig }) => {
    const {
      parentCode, widgetAction, pageCode, frameId,
    } = params;
    if (widgetAction && widgetAction === CONFIG_SIMPLE_PARAMETER) {
      // navigate to specific form
    }
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    if (widgetConfig) {
      dispatch(initWidgetConfigPage(pageCode, parentCode, parseInt(frameId, 10)));
    } else {
      dispatch(initWidgetConfigPageWithConfigData(pageCode, parentCode, parseInt(frameId, 10)));
    }
    dispatch(initNewUserWidget(parentCode, true));
  },
  onSubmit: ({ values }) => {
    dispatch(setVisibleModal(''));
    const { config: configFields } = values;
    const jsonData = {
      ...values,
      config: convertConfigObject(configFields),
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    return dispatch(sendPostWidgets(jsonData));
  },
  onReplaceSubmit: async (values) => {
    const { config: configFields } = values;
    const {
      pageCode, frameId,
    } = params;
    const jsonData = {
      ...values,
      config: convertConfigObject(configFields),
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    await dispatch(sendPostWidgets(jsonData));
    await dispatch(removePageWidget(frameId, pageCode));
    await dispatch(updatePageWidget(values.code, null, frameId, pageCode));
    await dispatch(updateConfiguredPageWidget(
      { ...values.config },
      { pageCode, framePos: frameId, widgetCode: values.code },
    ));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('widget')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
});

const WidgetForm = injectIntl(reduxForm({
  form: 'widget',
  enableReinitialize: true,
})(WidgetFormBody));

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
