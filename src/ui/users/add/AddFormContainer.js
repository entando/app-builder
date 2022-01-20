import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';
import { sendPostUser } from 'state/users/actions';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_USER_LIST } from 'app-init/router';

import UserForm from 'ui/users/common/UserForm';

const AddFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profileTypes = useSelector(getProfileTypesOptions);

  const handleMount = useCallback(() => {
    dispatch(fetchProfileTypes({ page: 1, pageSize: 0 }));
  }, [dispatch]);

  const handleSubmit = useCallback((user, submitType) => {
    dispatch(sendPostUser(user, submitType === 'saveAndEditProfile'));
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
      profileTypes={profileTypes}
      onMount={handleMount}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDiscard={handleDiscard}
      onModalSave={handleModalSave}
    />
  );
};

export default AddFormContainer;
