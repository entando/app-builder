import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/profile-types/edit/EditFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

const EditProfileTypesPage = () => (
  <InternalPage className="EditProfileTypesPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.profile' },
      { label: 'menu.profileTypes', to: ROUTE_PROFILE_TYPE_LIST },
      { label: 'app.edit', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.edit"
        helpId="profileType.help"
      />
      <Row>
        <Col xs={12} >
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(EditProfileTypesPage);
