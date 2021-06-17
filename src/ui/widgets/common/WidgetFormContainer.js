import { connect } from 'react-redux';
import { change, initialize, submit } from 'redux-form';
import { clearErrors } from '@entando/messages';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { fetchLanguages } from 'state/languages/actions';
import { fetchMyGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { sendPostWidgets } from 'state/widgets/actions';
import { getUserPreferences } from 'state/user-preferences/selectors';
import WidgetForm from 'ui/widgets/common/WidgetForm';
import { getMyGroupPermissions } from 'state/permissions/selectors';
import { MANAGE_PAGES_PERMISSION, ROLE_SUPERUSER } from 'state/permissions/const';
import { fetchMyGroupPermissions } from 'state/permissions/actions';

export const mapStateToProps = (state) => {
  const userPreferences = getUserPreferences(state);
  const groupWithPagePermission = getMyGroupPermissions(state)
    .find(({ permissions }) => (
      permissions.includes(ROLE_SUPERUSER) || permissions.includes(MANAGE_PAGES_PERMISSION)
    ));
  const defaultOwnerGroup = userPreferences.defaultPageOwnerGroup
    || (groupWithPagePermission && groupWithPagePermission.group);
  return ({
    groups: getGroupsList(state),
    group: defaultOwnerGroup,
    initialValues: {
      group: defaultOwnerGroup,
    },
  });
};

export const mapDispatchToProps = (dispatch, { history }) => ({
  onWillMount: (props) => {
    dispatch(fetchMyGroupPermissions({ sort: 'group' }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchMyGroups({ sort: 'name' }));
    dispatch(initialize('widget', { group: props.group || '' }));
  },
  onSubmit: (values, saveType) => {
    const jsonData = {
      ...values,
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    return dispatch(sendPostWidgets(jsonData, saveType));
  },
  onChangeDefaultTitle: title =>
    dispatch(change('widget', 'code', title.replace(/\W/g, '_').toLowerCase())),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('widget')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
