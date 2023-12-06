import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import EmailSenderForm from 'ui/email-config/EmailSenderForm';
import { addEmailSender } from 'state/email-config/actions';

const AddEmailSenderFormContainer = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    values => dispatch(addEmailSender(values)),
    [dispatch],
  );

  const initialValues = { code: '', email: '' };

  return (
    <EmailSenderForm
      titleId="emailConfig.senderMgmt.new"
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

export default AddEmailSenderFormContainer;
