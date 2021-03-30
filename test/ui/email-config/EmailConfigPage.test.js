import React from 'react';
import { screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import EmailConfigPage from 'ui/email-config/EmailConfigPage';
import { renderWithIntlAndRouter } from 'test/testUtils';

jest.unmock('ui/common/BreadcrumbItem');

const mockEmailConfigSenderMgmtText = 'Email Config Sender Mgmt';
const mockEmailConfigSmtpServerText = 'Email Config Smtp Server';
const mockAddEmailSenderFormText = 'Add Email Sender Form';
const mockEditEmailSenderFormText = 'Edit Email Sender Form';
jest.mock('ui/email-config/EmailConfigSenderMgmtContainer', () => () => (<div>{mockEmailConfigSenderMgmtText}</div>));
jest.mock('ui/email-config/EmailConfigSmtpServerContainer', () => () => (<div>{mockEmailConfigSmtpServerText}</div>));
jest.mock('ui/email-config/AddEmailSenderFormContainer', () => () => (<div>{mockAddEmailSenderFormText}</div>));
jest.mock('ui/email-config/EditEmailSenderFormContainer', () => () => (<div>{mockEditEmailSenderFormText}</div>));

describe('EmailConfigPage', () => {
  const getBreadcrumbView = () => within(screen.getByTestId('breadcrumb'));

  it('should render internal page layout', () => {
    const { getByTestId, container } = renderWithIntlAndRouter(<EmailConfigPage />);
    expect(getByTestId('internal-page')).toBe(container.firstChild);
  });

  it('should render breadcrumbs', () => {
    renderWithIntlAndRouter(
      (
        <EmailConfigPage />
      ), { initialRoute: '/email-config' },
    );
    const breadcrumbView = getBreadcrumbView();
    expect(breadcrumbView.getByText('Administration')).toBeInTheDocument();
    expect(breadcrumbView.getByText('Email Configuration')).toBeInTheDocument();
    expect(breadcrumbView.getByText('SMTP Server')).toBeInTheDocument();
  });

  describe('default route', () => {
    beforeEach(() => renderWithIntlAndRouter(<EmailConfigPage />));

    it('should render the correct heading', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Email Configuration');
    });

    it('should render Sender Management and SMTP Server tabs', () => {
      const tabsView = within(screen.getByRole('tablist'));
      const tabs = tabsView.getAllByRole('menuitem');
      const tab1View = within(tabs[0]);
      const tab2View = within(tabs[1]);
      expect(tabs).toHaveLength(2);
      expect(tab1View.getByText('Sender Management')).toBeInTheDocument();
      expect(tab2View.getByText('SMTP Server')).toBeInTheDocument();
    });

    it('should switch tabs after clicking on a tab', () => {
      const tabsView = within(screen.getByRole('tablist'));

      const senderMgmtTab = tabsView.getByText('Sender Management');
      userEvent.click(senderMgmtTab);
      expect(screen.getByText(mockEmailConfigSenderMgmtText)).toBeInTheDocument();
      expect(screen.queryByText(mockEmailConfigSmtpServerText)).not.toBeInTheDocument();

      const smtpServerTab = tabsView.getByText('SMTP Server');
      userEvent.click(smtpServerTab);
      expect(screen.getByText(mockEmailConfigSmtpServerText)).toBeInTheDocument();
      expect(screen.queryByText(mockEmailConfigSenderMgmtText)).not.toBeInTheDocument();
    });
  });

  describe('add sender route', () => {
    beforeEach(() => {
      renderWithIntlAndRouter(<EmailConfigPage />, {
        initialRoute: '/email-config/senders/add',
      });
    });

    it('should render the correct breadcrumb', () => {
      const breadcrumbView = getBreadcrumbView();
      expect(breadcrumbView.getByText('New Sender')).toBeInTheDocument();
    });

    it('should render the add sender form', () => {
      expect(screen.getByText(mockAddEmailSenderFormText)).toBeInTheDocument();
    });
  });

  describe('edit sender route', () => {
    const testCode = 'testcode';
    const ROUTE_EMAIL_CONFIG_SENDERS_EDIT_TESTCODE = `/email-config/senders/edit/${testCode}`;

    beforeEach(() => {
      renderWithIntlAndRouter(<EmailConfigPage />, {
        initialRoute: ROUTE_EMAIL_CONFIG_SENDERS_EDIT_TESTCODE,
      });
    });

    it('should render the correct breadcrumb', () => {
      const breadcrumbView = getBreadcrumbView();
      expect(breadcrumbView.getByText(`Edit Sender: ${testCode}`)).toBeInTheDocument();
    });

    it('should render the edit sender form', () => {
      expect(screen.getByText(`${mockEditEmailSenderFormText}`)).toBeInTheDocument();
    });
  });
});
