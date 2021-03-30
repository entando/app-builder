import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { deleteEmailSender } from 'state/email-config/actions';
import DeleteSenderModal from 'ui/email-config/DeleteSenderModal';

const DeleteSenderModalContainer = () => {
  const dispatch = useDispatch();

  const info = useSelector(getInfo);

  const handleDeleteConfirm = useCallback(
    (code) => {
      dispatch(deleteEmailSender(code));
      dispatch(setVisibleModal(''));
    },
    [dispatch],
  );

  return (
    <DeleteSenderModal info={info} onDeleteConfirm={handleDeleteConfirm} />
  );
};

export default DeleteSenderModalContainer;
