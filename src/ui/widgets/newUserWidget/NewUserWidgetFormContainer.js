import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { clearErrors } from '@entando/messages';
import { get } from 'lodash';
import WidgetForm from 'ui/widgets/common/WidgetForm';

import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { fetchMyGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import {
  getSelectedWidgetDefaultUi,
  getSelectedParentWidget,
  getSelectedParentWidgetParameters,
} from 'state/widgets/selectors';
import { initNewUserWidget, sendPostWidgets } from 'state/widgets/actions';
import { getLoading } from 'state/loading/selectors';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { getUserPreferences } from 'state/user-preferences/selectors';
import { getMyGroupPermissions } from 'state/permissions/selectors';
import { MANAGE_PAGES_PERMISSION, SUPERUSER_PERMISSION } from 'state/permissions/const';

export const mapStateToProps = (state) => {
  const selectedParentWidget = getSelectedParentWidget(state) || {};
  const userPreferences = getUserPreferences(state);
  const groupWithPagePermission = getMyGroupPermissions(state)
    .find(({ permissions }) => (
      permissions.includes(SUPERUSER_PERMISSION) || permissions.includes(MANAGE_PAGES_PERMISSION)
    ));
  const defaultOwnerGroup = userPreferences.defaultPageOwnerGroup
    || (groupWithPagePermission && groupWithPagePermission.group);
  return ({
    groups: getGroupsList(state),
    parentWidget: selectedParentWidget,
    parentWidgetParameters: getSelectedParentWidgetParameters(state),
    defaultUIField: getSelectedWidgetDefaultUi(state),
    languages: getActiveLanguages(state),
    loading: getLoading(state).fetchWidget,
    initialValues: {
      config: get(selectedParentWidget, 'parameters', []),
      parentType: get(selectedParentWidget, 'code', ''),
      group: defaultOwnerGroup,
    },
  });
};

export const mapDispatchToProps = (dispatch, { history, match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchMyGroups());
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(initNewUserWidget(params.widgetCode));
  },
  onSubmit: (values, saveType) => {
    const jsonData = {
      ...values,
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    return dispatch(sendPostWidgets(jsonData, saveType));
  },
  onSave: (submitForm) => { dispatch(setVisibleModal('')); submitForm(); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
  onChangeDefaultTitle: (title, setFieldValue) =>
    setFieldValue('code', title.replace(/\W/g, '_').toLowerCase()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
