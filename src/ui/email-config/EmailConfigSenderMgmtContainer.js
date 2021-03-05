import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInfo, setVisibleModal } from 'state/modal/actions';
import { MODAL_ID as DELETE_SENDER_MODAL_ID } from 'ui/email-config/DeleteSenderModal';
import EmailConfigSenderMgmt from 'ui/email-config/EmailConfigSenderMgmt';
import { fetchEmailSenders } from 'state/email-config/actions';

const EmailConfigSenderMgmtContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmailSenders());
  }, [dispatch]);

  const senders = useSelector(state => state.emailConfig.senders);

  const handleDeleteClick = useCallback(
    (sender) => {
      dispatch(setVisibleModal(DELETE_SENDER_MODAL_ID));
      dispatch(setInfo({ type: 'sender', code: sender.code }));
    },
    [dispatch],
  );

  return (
    <EmailConfigSenderMgmt
      senders={senders}
      onDeleteClick={handleDeleteClick}
    />
  );
};

export default EmailConfigSenderMgmtContainer;
