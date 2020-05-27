import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ReloadConfirmContainer from 'ui/reload-configuration/ReloadConfirmContainer';
import { ROUTE_RELOAD_CONFIG } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const ReloadConfirmPageBody = () => (

  <InternalPage className="ReloadConfirmPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_RELOAD_CONFIG}>
              <FormattedMessage id="menu.reloadConfiguration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.reloadConfirm" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="reloadConfiguration.title"
        helpId="reloadConfiguration.help"
      />
      <Row>
        <Col xs={12}>
          <ReloadConfirmContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(ROLE_SUPERUSER)(ReloadConfirmPageBody);
