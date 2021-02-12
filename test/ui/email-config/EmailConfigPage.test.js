import React from 'react';
import { within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import EmailConfigPage from 'ui/email-config/EmailConfigPage';
import { ROUTE_EMAIL_CONFIG } from 'app-init/router';
import { renderWithIntlAndRouter as render } from 'test/testUtils';

jest.unmock('ui/common/BreadcrumbItem');

const mockEmailConfigSenderMgmtText = 'Email Config Sender Mgmt';
const mockEmailConfigSmtpServerText = 'Email Config Smtp Server';
jest.mock('ui/email-config/EmailConfigSenderMgmtContainer', () => () => (<div>{mockEmailConfigSenderMgmtText}</div>));
jest.mock('ui/email-config/EmailConfigSmtpServerContainer', () => () => (<div>{mockEmailConfigSmtpServerText}</div>));


describe('EmailConfigPage', () => {
  it('should have internal page layout', () => {
    const { getByTestId, container } = render(<EmailConfigPage />);
    expect(getByTestId('internal-page')).toBe(container.firstChild);
  });

  it('should have breadcrumb', () => {
    const { getByTestId } = render(
      (
        <EmailConfigPage />
      ), { initialRoute: ROUTE_EMAIL_CONFIG },
    );
    const breadcrumbView = within(getByTestId('breadcrumb'));
    expect(breadcrumbView.getByText('Administration')).toBeInTheDocument();
    expect(breadcrumbView.getByText('Email Configuration')).toBeInTheDocument();
    expect(breadcrumbView.getByText('SMTP Server')).toBeInTheDocument();
  });

  it('should have heading', () => {
    const { getByRole } = render(<EmailConfigPage />);
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Email Configuration');
  });

  it('should have Sender Management and SMTP Server tabs', () => {
    const { getByRole } = render(<EmailConfigPage />);
    const tabsView = within(getByRole('tablist'));
    const tabs = tabsView.getAllByRole('menuitem');
    const tab1View = within(tabs[0]);
    const tab2View = within(tabs[1]);
    expect(tabs).toHaveLength(2);
    expect(tab1View.getByText('Sender Management')).toBeInTheDocument();
    expect(tab2View.getByText('SMTP Server')).toBeInTheDocument();
  });

  it('should switch tabs after clicking on a tab', () => {
    const { getByRole, getByText, queryByText } = render(<EmailConfigPage />);
    const tabsView = within(getByRole('tablist'));

    const senderMgmtTab = tabsView.getByText('Sender Management');
    userEvent.click(senderMgmtTab);
    expect(getByText(mockEmailConfigSenderMgmtText)).toBeInTheDocument();
    expect(queryByText(mockEmailConfigSmtpServerText)).not.toBeInTheDocument();

    const smtpServerTab = tabsView.getByText('SMTP Server');
    userEvent.click(smtpServerTab);
    expect(getByText(mockEmailConfigSmtpServerText)).toBeInTheDocument();
    expect(queryByText(mockEmailConfigSenderMgmtText)).not.toBeInTheDocument();
  });
});
