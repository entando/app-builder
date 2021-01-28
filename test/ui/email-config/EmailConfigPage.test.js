import React from 'react';
import { render as rtlRender, within } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import EmailConfigPage from 'ui/email-config/EmailConfigPage';
import { MemoryRouter } from 'react-router-dom';
import { ROUTE_EMAIL_CONFIG } from 'app-init/router';
import enTranslations from 'locales/en';

jest.unmock('ui/common/BreadcrumbItem');

const { locale: enLocale, messages: enMessages } = enTranslations;

const render = (ui, {
  route, locale = enLocale, messages = enMessages, ...renderOptions
} = {}) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </MemoryRouter>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('EmailConfigPage', () => {
  it('should have breadcrumb', async () => {
    const { getByTestId } = render(
      (
        <EmailConfigPage />
      ), { route: ROUTE_EMAIL_CONFIG },
    );
    const breadcrumb = within(getByTestId('breadcrumb'));
    expect(breadcrumb.getByText('Administration')).toBeDefined();
    expect(breadcrumb.getByText('Email Configuration')).toBeDefined();
    expect(breadcrumb.getByText('SMTP Server')).toBeDefined();
  });
});
