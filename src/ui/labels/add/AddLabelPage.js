import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/labels/add/AddFormContainer';
import { ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const AddLabelPageBody = () => (
  <InternalPage className="AddLabelPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.uxComponents' },
      { label: 'menu.labelsAndLanguages', to: ROUTE_LABELS_AND_LANGUAGES },
      { label: 'menu.uxComponents.addLabels' },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.add"
            helpId="label.detail.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(SUPERUSER_PERMISSION)(AddLabelPageBody);
