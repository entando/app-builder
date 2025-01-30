import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DetailRoleTableContainer from 'ui/roles/detail/DetailRoleTableContainer';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import { ROUTE_ROLE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const DetailRolePageBody = () => (
  <InternalPage className="DetailRolePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.configuration' },
      { label: 'menu.roles', to: ROUTE_ROLE_LIST },
      { label: 'app.details', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.details"
            helpId="role.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <DetailRoleTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(DetailRolePageBody);
