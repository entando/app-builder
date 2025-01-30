import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import AddFormContainer from 'ui/fragments/add/AddFormContainer';
import withPermissions from 'ui/auth/withPermissions';

export const AddFragmentPageBody = () => (

  <InternalPage className="AddFragmentPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.uxComponents' },
      { label: 'menu.uxComponents.fragment', to: ROUTE_FRAGMENT_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="fragment.detail.title"
        helpId="fragment.detail.help"
      />
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(AddFragmentPageBody);
