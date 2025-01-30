import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import EditFormContainer from 'ui/groups/edit/EditFormContainer';
import { ROUTE_GROUP_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const EditGroupPageBody = () => (

  <InternalPage className="EditGroupPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.groups', to: ROUTE_GROUP_LIST },
      { label: 'app.edit', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.edit"
        helpId="group.help"
      />
      <Row>
        <Col xs={12}>
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(EditGroupPageBody);
