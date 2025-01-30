import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import GroupDetailTableContainer from 'ui/groups/detail/GroupDetailTableContainer';
import { ROUTE_GROUP_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const DetailGroupPageBody = () => (
  <InternalPage className="DetailGroupPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.groups', to: ROUTE_GROUP_LIST },
      { label: 'app.details', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.details"
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <GroupDetailTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(DetailGroupPageBody);
