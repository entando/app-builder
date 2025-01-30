import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import AddFormContainer from 'ui/data-types/add/AddFormContainer';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const AddDataTypesPage = () => (
  <InternalPage className="AddDataTypesPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.data' },
      { label: 'menu.dataType', to: ROUTE_DATA_TYPE_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <PageTitle
        titleId="app.add"
        helpId="dataType.help"
      />
      <Row>
        <Col xs={12} >
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(AddDataTypesPage);
