import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { sendPutRole, fetchRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_ROLE_LIST } from 'app-init/router';

import RoleForm from 'ui/roles/common/RoleForm';
import { getSelectedRole } from 'state/roles/selectors';

export const EDIT_MODE = 'edit';

const EditFormContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const permissions = useSelector(getPermissionsList);
  const { params } = useRouteMatch();
  const loading = useSelector(getLoading);
  const selectedRole = useSelector(getSelectedRole);

  const handleWillMount = useCallback((roleCode) => {
    dispatch(fetchPermissions());
    dispatch(fetchRole(roleCode));
  }, [dispatch]);

  const handleSubmit = useCallback((values) => {
    dispatch(setVisibleModal(''));
    dispatch(sendPutRole(values));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(setVisibleModal(ConfirmCancelModalID));
  }, [dispatch]);

  const handleDiscard = useCallback(() => {
    dispatch(setVisibleModal(''));
    history.push(routeConverter(ROUTE_ROLE_LIST));
  }, [dispatch, history]);

  const initialValues = useMemo(() => ({
    ...selectedRole,
  }), [selectedRole]);


  return (<RoleForm
    onWillMount={handleWillMount}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    onDiscard={handleDiscard}
    mode={EDIT_MODE}
    permissions={permissions}
    roleCode={params.roleCode}
    loading={loading.permissions}
    initialValues={initialValues}
  />);
};

export default EditFormContainer;
