import React, { useCallback } from 'react';
import { Grid, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import cx from 'classnames';

import InternalPage from 'ui/internal-page/InternalPage';
import { ROUTE_EMAIL_CONFIG, ROUTE_EMAIL_CONFIG_SENDERS, ROUTE_EMAIL_CONFIG_SENDERS_ADD, ROUTE_EMAIL_CONFIG_SENDERS_EDIT } from 'app-init/router';
import PageTitle from 'ui/internal-page/PageTitle';
import EmailConfigSenderMgmtContainer from 'ui/email-config/EmailConfigSenderMgmtContainer';
import EmailConfigSmtpServerContainer from 'ui/email-config/EmailConfigSmtpServerContainer';
import AddEmailSenderFormContainer from 'ui/email-config/AddEmailSenderFormContainer';
import EditEmailSenderFormContainer from 'ui/email-config/EditEmailSenderFormContainer';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

const EmailConfigPage = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const getBreadbrumbs = useCallback(() => {
    const rootBreadcrumb = [{ label: 'menu.settings' }, { label: 'menu.emailConfig' }];

    switch (pathname) {
      case ROUTE_EMAIL_CONFIG:
        return [...rootBreadcrumb, { label: 'emailConfig.smtpServer' }];
      case ROUTE_EMAIL_CONFIG_SENDERS:
        return [...rootBreadcrumb, { label: 'emailConfig.senderMgmt' }];
      case ROUTE_EMAIL_CONFIG_SENDERS_ADD:
        return [...rootBreadcrumb, { label: 'emailConfig.senderMgmt', to: ROUTE_EMAIL_CONFIG_SENDERS }, { label: 'emailConfig.senderMgmt.new' }];
      default:

        if (pathname.includes('/email-config/senders/edit/')) {
          const param = pathname.split('/').pop();
          return [
            ...rootBreadcrumb,
            { label: 'emailConfig.senderMgmt', to: ROUTE_EMAIL_CONFIG_SENDERS },
            { children: <FormattedMessage id="emailConfig.senderMgmt.editWithCode" values={{ code: param }} /> },
          ];
        }
    }
    return rootBreadcrumb;
  }, [pathname]);

  const tabs = (
    <div className="button-group">
      <Button
        active={pathname === ROUTE_EMAIL_CONFIG_SENDERS}
        onClick={() => history.push(ROUTE_EMAIL_CONFIG_SENDERS)}
        className={cx('EmailConfigPage__tab', pathname === ROUTE_EMAIL_CONFIG_SENDERS && 'selected')}
      >
        <FormattedMessage id="emailConfig.senderMgmt" />
      </Button>
      <Button
        active={pathname === ROUTE_EMAIL_CONFIG}
        onClick={() => history.push(ROUTE_EMAIL_CONFIG)}
        className={cx('EmailConfigPage__tab', pathname === ROUTE_EMAIL_CONFIG && 'selected')}
      >
        <FormattedMessage id="emailConfig.smtpServer" />
      </Button>
    </div>
  );

  return (
    <InternalPage className="EmailConfigPage">
      <HeaderBreadcrumb breadcrumbs={getBreadbrumbs()} data-testid="breadcrumb" />
      <Grid fluid>
        <Switch>
          <Route
            exact
            path={ROUTE_EMAIL_CONFIG_SENDERS_ADD}
            component={AddEmailSenderFormContainer}
          />
          <Route
            exact
            path={ROUTE_EMAIL_CONFIG_SENDERS_EDIT}
            component={EditEmailSenderFormContainer}
          />
          <Route>
            <div className="header-container">
              <div className="header-content">
                <PageTitle titleId="menu.emailConfig" helpId="emailConfig.help" />
                {tabs}
              </div>
            </div>


            <Switch>
              <Route
                exact
                path={ROUTE_EMAIL_CONFIG_SENDERS}
                component={EmailConfigSenderMgmtContainer}
              />
              <Route
                exact
                path={ROUTE_EMAIL_CONFIG}
                component={EmailConfigSmtpServerContainer}
              />
            </Switch>
          </Route>
        </Switch>
      </Grid>
    </InternalPage>
  );
};

export default EmailConfigPage;
