import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/roles/add/AddFormContainer';
import { ROUTE_ROLE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const AddRolePageBody = () => (

  <InternalPage className="AddRolePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.roles', to: ROUTE_ROLE_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.add"
        helpId="role.help"
        data-testid="add-user-role"
      />
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(AddRolePageBody);
