import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/users/edit/EditFormContainer';
import { ROUTE_USER_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { CRUD_USERS_PERMISSION } from 'state/permissions/const';

export const EditUserPageBody = () => (
  <InternalPage className="EditUserPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users', to: ROUTE_USER_LIST },
      { label: 'app.edit', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.edit"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(CRUD_USERS_PERMISSION)(EditUserPageBody);
