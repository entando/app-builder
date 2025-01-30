import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import { ROUTE_USER_LIST } from 'app-init/router';
import DetailUserTableContainer from 'ui/users/detail/DetailUserTableContainer';
import withPermissions from 'ui/auth/withPermissions';
import { VIEW_USERS_AND_PROFILES_PERMISSION } from 'state/permissions/const';

export const DetailUserPageBody = () => (
  <InternalPage className="DetailUserPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users', to: ROUTE_USER_LIST },
      { label: 'menu.details', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.details"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          <DetailUserTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);
export default withPermissions(VIEW_USERS_AND_PROFILES_PERMISSION)(DetailUserPageBody);
