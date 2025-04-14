import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { clearErrors } from '@entando/messages';
import WidgetForm from 'ui/widgets/common/WidgetForm';
import { get } from 'lodash';
import { fetchLanguages } from 'state/languages/actions';
import { removePageWidget, updatePageWidget } from 'state/page-config/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getConfigMap } from 'state/page-config/selectors';
import { fetchMyGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getSelectedWidgetDefaultUi, getSelectedParentWidget, getSelectedParentWidgetParameters, getSelectedWidget } from 'state/widgets/selectors';
import { initNewUserWidget, sendPostWidgets } from 'state/widgets/actions';
import { initWidgetConfigPage, initWidgetConfigPageWithConfigData, updateConfiguredPageWidget } from 'state/widget-config/actions';
import { getLoading } from 'state/loading/selectors';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { convertConfigObject, stringifyMultiContentsConfigArray } from 'helpers/conversion';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';
import { MULTIPLE_CONTENTS_CONFIG } from 'ui/widget-forms/const';
import { getUserPreferences } from 'state/user-preferences/selectors';
import { getMyGroupPermissions } from 'state/permissions/selectors';
import { MANAGE_PAGES_PERMISSION, SUPERUSER_PERMISSION } from 'state/permissions/const';

const CONFIG_SIMPLE_PARAMETER = 'configSimpleParameter';
const MODE_CLONE = 'clone';

export const mapStateToProps = (state, { match: { params } }) => {
  const { pageCode, parentCode, frameId } = params;
  const pageConfig = getConfigMap(state) || {};
  const config = get(pageConfig, `${pageCode}.${frameId}.config`, {});
  const userPreferences = getUserPreferences(state);
  const groupWithPagePermission = getMyGroupPermissions(state)
    .find(({ permissions }) => (
      permissions.includes(SUPERUSER_PERMISSION) || permissions.includes(MANAGE_PAGES_PERMISSION)
    ));
  const defaultOwnerGroup = userPreferences.defaultPageOwnerGroup
    || (groupWithPagePermission && groupWithPagePermission.group);
  const initialValues = {
    config,
    parentType: parentCode,
    group: defaultOwnerGroup,
  };
  const widget = getSelectedWidget(state);
  return ({
    mode: MODE_CLONE,
    groups: getGroupsList(state),
    parentWidget: getSelectedParentWidget(state),
    config,
    parentWidgetParameters: getSelectedParentWidgetParameters(state),
    defaultUIField: getSelectedWidgetDefaultUi(state),
    languages: getActiveLanguages(state),
    loading: getLoading(state).fetchWidget,
    initialValues,
    configUiRequired: isMicrofrontendWidgetForm(widget),
  });
};

export const mapDispatchToProps = (dispatch, { history, match: { params } }) => ({
  onWillMount: ({ widgetConfig }) => {
    const {
      parentCode, configUiName, pageCode, frameId,
    } = params;
    if (configUiName && configUiName === CONFIG_SIMPLE_PARAMETER) {
      // navigate to specific form
    }
    dispatch(fetchMyGroups({ sort: 'name' }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    if (widgetConfig) {
      dispatch(initWidgetConfigPage(pageCode, parentCode, parseInt(frameId, 10)));
    } else {
      dispatch(initWidgetConfigPageWithConfigData(pageCode, parentCode, parseInt(frameId, 10)));
    }
    dispatch(initNewUserWidget(parentCode));
  },
  onSubmit: (values, saveType) => {
    const { config: configFields, parentType } = values;
    const jsonData = {
      ...values,
      config: parentType !== MULTIPLE_CONTENTS_CONFIG
        ? convertConfigObject(configFields)
        : {
          ...convertConfigObject(configFields),
          contents: stringifyMultiContentsConfigArray(configFields.contents),
        },
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    return dispatch(sendPostWidgets(jsonData, saveType));
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
  onSave: (submitForm) => { dispatch(setVisibleModal('')); submitForm('widget'); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
  onChangeDefaultTitle: (title, setFieldValue) =>
    setFieldValue('code', title.replace(/\W/g, '_').toLowerCase()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
