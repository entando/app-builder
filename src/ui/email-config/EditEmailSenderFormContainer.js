import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EmailSenderForm from 'ui/email-config/EmailSenderForm';
import { fetchEmailSender, updateEmailSender } from 'state/email-config/actions';
import { getSelectedSender } from 'state/email-config/selectors';

const EditEmailSenderFormContainer = () => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const selectedSender = useSelector(getSelectedSender);

  const initialValues = useMemo(() => ({
    code: '',
    email: '',
    ...selectedSender,
  }), [selectedSender]);

  useEffect(() => {
    dispatch(fetchEmailSender(code));
  }, [dispatch, code]);

  const handleSubmit = useCallback(
    values => dispatch(updateEmailSender(values)),
    [dispatch],
  );

  return (
    <EmailSenderForm
      titleId="emailConfig.senderMgmt.edit"
      onSubmit={handleSubmit}
      initialValues={initialValues}
      editing
    />
  );
};

export default EditEmailSenderFormContainer;
