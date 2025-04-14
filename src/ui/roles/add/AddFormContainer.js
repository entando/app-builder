import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { routeConverter } from '@entando/utils';

import { sendPostRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_ROLE_LIST } from 'app-init/router';

import RoleForm from 'ui/roles/common/RoleForm';

const AddFormContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const permissions = useSelector(getPermissionsList);
  const loading = useSelector(getLoading);

  const handleMount = useCallback(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleSubmit = useCallback((values) => {
    dispatch(setVisibleModal(''));
    dispatch(sendPostRole(values));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(setVisibleModal(ConfirmCancelModalID));
  }, [dispatch]);

  const handleDiscard = useCallback(() => {
    dispatch(setVisibleModal(''));
    history.push(routeConverter(ROUTE_ROLE_LIST));
  }, [dispatch, history]);

  const initialValues = useMemo(() => ({
    code: '',
    name: '',
    permissions: permissions.reduce((acc, perm) => ({
      [perm.code]: false,
    }), {}),
  }), [permissions]);

  return (<RoleForm
    onMount={handleMount}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    onDiscard={handleDiscard}
    permissions={permissions}
    loading={loading.permissions}
    initialValues={initialValues}
  />);
};

export default AddFormContainer;
