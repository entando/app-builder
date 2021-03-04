import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import EmailSenderForm from 'ui/email-config/EmailSenderForm';

const AddEmailSenderFormContainer = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    values => dispatch({ type: 'addEmailSender_test', payload: values }),
    [dispatch],
  );

  return (
    <EmailSenderForm titleId="emailConfig.senderMgmt.new" onSubmit={handleSubmit} />
  );
};

export default AddEmailSenderFormContainer;
