import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import EmailSenderForm from 'ui/email-config/EmailSenderForm';

const EditEmailSenderFormContainer = () => {
  const dispatch = useDispatch();
  const { code } = useParams();

  useEffect(() => {
    dispatch({ type: 'fetchEmailSender_test', payload: code });
  }, [dispatch, code]);

  const handleSubmit = useCallback(
    values => dispatch({ type: 'updateEmailSender_test', payload: values }),
    [dispatch],
  );

  return (
    <EmailSenderForm titleId="emailConfig.senderMgmt.edit" onSubmit={handleSubmit} />
  );
};

export default EditEmailSenderFormContainer;
