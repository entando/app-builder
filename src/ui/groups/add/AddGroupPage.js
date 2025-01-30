import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import AddFormContainer from 'ui/groups/add/AddFormContainer';
import { ROUTE_GROUP_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const AddGroupPageBody = () => (

  <InternalPage className="AddGroupPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.groups', to: ROUTE_GROUP_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.add"
        helpId="group.help"
      />
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(AddGroupPageBody);
