import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/roles/edit/EditFormContainer';
import { ROUTE_ROLE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const EditRolePageBody = () => (

  <InternalPage className="EditRolePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.roles', to: ROUTE_ROLE_LIST },
      { label: 'app.edit', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.edit"
        helpId="role.help"
        data-testid="edit-user-role"
      />
      <Row>
        <Col xs={12}>
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(EditRolePageBody);
