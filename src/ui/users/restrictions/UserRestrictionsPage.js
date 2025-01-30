import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import RestrictionsFormContainer from 'ui/users/restrictions/RestrictionsFormContainer';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const UserRestrictionsPageBody = () => (
  <InternalPage className="UserRestrictionsPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users.restrictions', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="user.restrictions.title"
            helpId="user.restrictions.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <RestrictionsFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(UserRestrictionsPageBody);
