import React from 'react';
import { Grid, Row, Col, Breadcrumb, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import InternalPage from 'ui/internal-page/InternalPage';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { ROUTE_EMAIL_CONFIG, ROUTE_EMAIL_CONFIG_SENDERS } from 'app-init/router';
import PageTitle from 'ui/internal-page/PageTitle';
import EmailConfigSenderMgmtContainer from 'ui/email-config/EmailConfigSenderMgmtContainer';
import EmailConfigSmtpServerContainer from 'ui/email-config/EmailConfigSmtpServerContainer';

const EmailConfigPage = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <InternalPage className="EmailConfigPage">
      <Grid fluid>
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbItem>
            <FormattedMessage id="menu.settings" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <FormattedMessage id="menu.emailConfig" />
          </BreadcrumbItem>
          <Switch>
            <Route exact path={ROUTE_EMAIL_CONFIG}>
              <BreadcrumbItem active>
                <FormattedMessage id="emailConfig.smtpServer" />
              </BreadcrumbItem>
            </Route>
            <Route exact path={ROUTE_EMAIL_CONFIG_SENDERS}>
              <BreadcrumbItem active>
                <FormattedMessage id="emailConfig.senderMgmt" />
              </BreadcrumbItem>
            </Route>
          </Switch>
        </Breadcrumb>
        <Row>
          <Col sm={12} md={6}>
            <PageTitle titleId="menu.emailConfig" helpId="emailConfig.help" />
          </Col>
          <Col sm={12} md={6}>
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
      </Grid>
    </InternalPage>
  );
};

export default EmailConfigPage;
