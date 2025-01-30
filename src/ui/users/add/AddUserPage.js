import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/users/add/AddFormContainer';
import { ROUTE_USER_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { CRUD_USERS_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const AddUserPageBody = () => (

  <InternalPage className="AddUserPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users', to: ROUTE_USER_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.add"
        helpId="user.help"
        data-testid="add-user-title"
      />
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(CRUD_USERS_PERMISSION)(AddUserPageBody);
