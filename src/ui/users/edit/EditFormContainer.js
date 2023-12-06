import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { fetchCurrentPageUserDetail, sendPutUser } from 'state/users/actions';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_USER_LIST } from 'app-init/router';
import UserForm from 'ui/users/common/UserForm';
import { getSelectedUser } from 'state/users/selectors';


const EditFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams();
  const selectedUser = useSelector(getSelectedUser);

  const initialValues = useMemo(() => ({
    ...selectedUser,
    username,
    password: '',
    passwordConfirm: '',
    reset: false,
  }), [selectedUser, username]);

  const handleMount = useCallback(() => {
    dispatch(fetchCurrentPageUserDetail(username));
  }, [dispatch, username]);

  const handleSubmit = useCallback((user) => {
    const updatedUser = {
      ...user,
      profileType: (user.profileType || {}).typeCode || '',
      password: user.password || undefined,
      passwordConfirm: user.passwordConfirm || undefined,
    };
    dispatch(sendPutUser(updatedUser));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(setVisibleModal(ConfirmCancelModalID));
  }, [dispatch]);

  const handleDiscard = useCallback(() => {
    dispatch(setVisibleModal(''));
    history.push(routeConverter(ROUTE_USER_LIST));
  }, [dispatch, history]);

  const handleModalSave = useCallback(() => {
    dispatch(setVisibleModal(''));
  }, [dispatch]);

  return (
    <UserForm
      onMount={handleMount}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDiscard={handleDiscard}
      onModalSave={handleModalSave}
      initialValues={initialValues}
      editing
    />
  );
};

export default EditFormContainer;
