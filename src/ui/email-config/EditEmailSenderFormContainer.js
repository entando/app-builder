import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import EmailSenderForm from 'ui/email-config/EmailSenderForm';
import { fetchEmailSender, updateEmailSender } from 'state/email-config/actions';

const EditEmailSenderFormContainer = () => {
  const dispatch = useDispatch();
  const { code } = useParams();

  useEffect(() => {
    dispatch(fetchEmailSender(code));
  }, [dispatch, code]);

  const handleSubmit = useCallback(
    values => dispatch(updateEmailSender(values)),
    [dispatch],
  );

  return (
    <EmailSenderForm titleId="emailConfig.senderMgmt.edit" onSubmit={handleSubmit} editing />
  );
};

export default EditEmailSenderFormContainer;
