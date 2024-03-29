import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/profile-types/edit/EditFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const EditProfileTypesPage = () => (
  <InternalPage className="EditProfileTypesPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.profile" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_PROFILE_TYPE_LIST}>
              <FormattedMessage id="menu.profileTypes" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
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
