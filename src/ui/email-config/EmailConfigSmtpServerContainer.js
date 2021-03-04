import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import EmailConfigSmtpServer from 'ui/email-config/EmailConfigSmtpServer';
import { fetchSMTPServerSettings } from 'state/email-config/actions';

const EmailConfigSmtpServerContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSMTPServerSettings());
  }, [dispatch]);

  const handleSubmit = useCallback(
    values => dispatch({ type: 'saveEmailConfig_test', payload: values }),
    [dispatch],
  );

  const handleTestConfig = useCallback(
    values => dispatch({ type: 'testEmailConfig_test', payload: values }),
    [dispatch],
  );

  const handleSendTestEmail = useCallback(
    () => dispatch({ type: 'sendTestEmail_test' }),
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
