import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageTitle from 'ui/internal-page/PageTitle';
import ReloadConfigContainer from 'ui/reload-configuration/ReloadConfigContainer';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const ReloadConfigPageBody = () => (

  <InternalPage className="ReloadConfPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.settings' },
      { label: 'menu.reloadConfiguration', active: true },
      ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="reloadConfiguration.title"
        helpId="reloadConfiguration.help"
      />
      <Row>
        <Col xs={12}>
          <ReloadConfigContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(ReloadConfigPageBody);
