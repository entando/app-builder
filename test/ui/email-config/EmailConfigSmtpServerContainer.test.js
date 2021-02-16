import React, { useEffect } from 'react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import { renderWithIntlAndState as render } from 'test/testUtils';

import { Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';

import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormLabel from 'ui/common/form/FormLabel';

jest.unmock('react-redux');
jest.unmock('redux-form');

const fetchSMTPServerSettings = jest.fn();

const EmailConfigSmtpServerBody = () => (
  <div>
    <Panel>
      <Panel.Body>
        <FormattedMessage id="emailConfig.smtpServer.panelMsg" />
      </Panel.Body>
    </Panel>
    <FormSectionTitle titleId="emailConfig.smtpServer.generalSettings" />
    <Field
      component={SwitchRenderer}
      name="active"
      label={<FormLabel labelId="emailConfig.smtpServer.active" />}
    />
    <Field
      component={SwitchRenderer}
      name="debugMode"
      label={<FormLabel labelId="emailConfig.smtpServer.debugMode" />}
    />
  </div>
);

const EmailConfigSmtpServer = reduxForm({
  form: 'emailConfig',
  enableReinitialize: true,
})(EmailConfigSmtpServerBody);

const EmailConfigSmtpServerContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSMTPServerSettings());
  }, [dispatch]);

  return (
    <EmailConfigSmtpServer />
  );
};

describe('EmailConfigSmtpServerContainer', () => {
  it('should have a panel message', () => {
    render(<EmailConfigSmtpServerContainer />);
    const panelMsg = 'Host is mandatory. Port and Timeout if blank, will default to 25 and 10000. Please leave Username and Password blank if the SMTP server does not require authentication.';
    expect(screen.getByText(panelMsg)).toBeInTheDocument();
  });

  it('should have General Settings form section', () => {
    render(<EmailConfigSmtpServerContainer />);
    expect(fetchSMTPServerSettings).toHaveBeenCalled();
    expect(screen.getByRole('heading')).toHaveTextContent('General Settings');
    expect(screen.getByLabelText('Active')).toHaveTextContent('ON');
    expect(screen.getByLabelText('Debug Mode')).toHaveTextContent('OFF');
  });
});
