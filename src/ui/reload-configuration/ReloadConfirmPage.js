import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ReloadConfirmContainer from 'ui/reload-configuration/ReloadConfirmContainer';
import { ROUTE_RELOAD_CONFIG } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const ReloadConfirmPageBody = () => (

  <InternalPage className="ReloadConfirmPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.settings' },
      { label: 'menu.reloadConfiguration', to: ROUTE_RELOAD_CONFIG },
      { label: 'menu.reloadConfirm', active: true },
      ]}
    />
    <Grid fluid>
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


export default withPermissions(SUPERUSER_PERMISSION)(ReloadConfirmPageBody);
