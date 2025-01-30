import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageTitle from 'ui/internal-page/PageTitle';
import EditUserProfileFormContainer from 'ui/user-profile/edit/EditUserProfileFormContainer';
import { ROUTE_USER_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { EDIT_USER_PROFILES_PERMISSION } from 'state/permissions/const';

export const EditUserProfilePageBody = () => (
  <InternalPage className="EditUserProfilePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users', to: ROUTE_USER_LIST },
      { label: 'userprofile.edit', active: true },
        ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.edit"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          <EditUserProfileFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default
withPermissions([EDIT_USER_PROFILES_PERMISSION])(EditUserProfilePageBody);
