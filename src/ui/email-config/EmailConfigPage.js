import React from 'react';
import { Grid, Row, Col, Breadcrumb, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import InternalPage from 'ui/internal-page/InternalPage';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { ROUTE_EMAIL_CONFIG, ROUTE_EMAIL_CONFIG_SENDERS, ROUTE_EMAIL_CONFIG_SENDERS_ADD, ROUTE_EMAIL_CONFIG_SENDERS_EDIT } from 'app-init/router';
import PageTitle from 'ui/internal-page/PageTitle';
import EmailConfigSenderMgmtContainer from 'ui/email-config/EmailConfigSenderMgmtContainer';
import EmailConfigSmtpServerContainer from 'ui/email-config/EmailConfigSmtpServerContainer';
import AddEmailSenderFormContainer from 'ui/email-config/AddEmailSenderFormContainer';
import EditEmailSenderFormContainer from 'ui/email-config/EditEmailSenderFormContainer';

const EmailConfigPage = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const breadcrumb = (
    <Breadcrumb data-testid="breadcrumb">
      <BreadcrumbItem>
        <FormattedMessage id="menu.settings" />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <FormattedMessage id="menu.emailConfig" />
      </BreadcrumbItem>
      <Switch>
        <Route exact path={ROUTE_EMAIL_CONFIG}>
          <BreadcrumbItem>
            <FormattedMessage id="emailConfig.smtpServer" />
          </BreadcrumbItem>
        </Route>
        <Route exact path={ROUTE_EMAIL_CONFIG_SENDERS}>
          <BreadcrumbItem>
            <FormattedMessage id="emailConfig.senderMgmt" />
          </BreadcrumbItem>
        </Route>
        <Route path={ROUTE_EMAIL_CONFIG_SENDERS}>
          <BreadcrumbItem to={ROUTE_EMAIL_CONFIG_SENDERS}>
            <FormattedMessage id="emailConfig.senderMgmt" />
          </BreadcrumbItem>
          <Switch>
            <Route exact path={ROUTE_EMAIL_CONFIG_SENDERS_ADD}>
              <BreadcrumbItem>
                <FormattedMessage id="emailConfig.senderMgmt.new" />
              </BreadcrumbItem>
            </Route>
            <Route
              exact
              path={ROUTE_EMAIL_CONFIG_SENDERS_EDIT}
              render={({ match: { params } }) => (
                <BreadcrumbItem>
                  <FormattedMessage id="emailConfig.senderMgmt.editWithCode" values={{ code: params.code }} />
                </BreadcrumbItem>
              )}
            />
          </Switch>
        </Route>
      </Switch>
    </Breadcrumb>
  );

  const tabs = (
    <ul role="tablist" className="nav nav-tabs nav-justified nav-tabs-pattern">
      <MenuItem
        className="EmailConfigPage__tab"
        active={pathname === ROUTE_EMAIL_CONFIG_SENDERS}
        onClick={() => history.push(ROUTE_EMAIL_CONFIG_SENDERS)}
      >
        <FormattedMessage id="emailConfig.senderMgmt" />
      </MenuItem>
      <MenuItem
        className="EmailConfigPage__tab"
        active={pathname === ROUTE_EMAIL_CONFIG}
        onClick={() => history.push(ROUTE_EMAIL_CONFIG)}
      >
        <FormattedMessage id="emailConfig.smtpServer" />
      </MenuItem>
    </ul>
  );

  return (
    <InternalPage className="EmailConfigPage">
      <Grid fluid>
        {breadcrumb}
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
            <Row>
              <Col sm={12} md={6}>
                <PageTitle titleId="menu.emailConfig" helpId="emailConfig.help" />
              </Col>
              <Col sm={12} md={6}>
                {tabs}
              </Col>
            </Row>
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
