import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import EmailConfigSmtpServer from 'ui/email-config/EmailConfigSmtpServer';
import {
  fetchSMTPServerSettings,
  saveEmailConfig,
  sendTestEmail,
  testEmailConfig,
} from 'state/email-config/actions';

const EmailConfigSmtpServerContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSMTPServerSettings());
  }, [dispatch]);

  const handleSubmit = useCallback(
    values => dispatch(saveEmailConfig(values)),
    [dispatch],
  );

  const handleTestConfig = useCallback(
    values => dispatch(testEmailConfig(values)),
    [dispatch],
  );

  const handleSendTestEmail = useCallback(
    () => dispatch(sendTestEmail()),
    [dispatch],
  );

  return (
    <EmailConfigSmtpServer
      onSubmit={handleSubmit}
      onTestConfig={handleTestConfig}
      onSendTestEmail={handleSendTestEmail}
    />
  );
};

export default EmailConfigSmtpServerContainer;
