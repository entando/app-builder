import React from 'react';
import { Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch } from 'react-router-dom';

import InternalPage from 'ui/internal-page/InternalPage';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { ROUTE_EMAIL_CONFIG, ROUTE_EMAIL_CONFIG_SENDERS } from 'app-init/router';

const EmailConfigPage = () => (
  <InternalPage>
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
  </InternalPage>
);

export default EmailConfigPage;
