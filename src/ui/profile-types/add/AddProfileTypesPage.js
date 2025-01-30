import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import AddFormContainer from 'ui/profile-types/add/AddFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const AddProfileTypesPage = () => (
  <InternalPage className="AddProfileTypesPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.profile' },
      { label: 'menu.profileTypes', to: ROUTE_PROFILE_TYPE_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.add"
        helpId="profileType.help"
      />
      <Row>
        <Col xs={12} >
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(AddProfileTypesPage);
