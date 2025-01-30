import React from 'react';
import { Grid, Col, Row } from 'patternfly-react';
import { ROUTE_HOME } from 'app-init/router';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageSettingsFormContainer from 'ui/pages/common/PageSettingsFormContainer';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';


export const PageSettingsPageBody = () => (
  <InternalPage className="PageSettings">
    <HeaderBreadcrumb breadcrumbs={[
        { label: 'menu.pageDesigner', to: ROUTE_HOME, active: true },
        { label: 'menu.pageSettings', to: ROUTE_HOME },
      ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="pageSettings.title"
        helpId="pageSettings.help"
      />
      <Row>
        <Col xs={12}>
          <PageSettingsFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(MANAGE_PAGES_PERMISSION)(PageSettingsPageBody);
