import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import EmailConfigSmtpServer from 'ui/email-config/EmailConfigSmtpServer';

const EmailConfigSmtpServerContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'fetchSMTPServerSettings' });
  }, [dispatch]);

  const handleSubmit = useCallback(
    () => dispatch({ type: 'saveEmailConfig' }),
    [dispatch],
  );

  const handleTestConfig = useCallback(
    () => dispatch({ type: 'testEmailConfig' }),
    [dispatch],
  );

  const handleSendTestEmail = useCallback(
    () => dispatch({ type: 'sendTestEmail' }),
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
