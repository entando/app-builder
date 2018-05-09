import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/labels/edit/EditFormContainer';
import { ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';

const EditLabelsPage = () => (
  <InternalPage className="EditLabelsPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_LABELS_AND_LANGUAGES}>
              <FormattedMessage id="menu.labelsAndLanguages" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern.addLabels" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.edit"
            helpId="label.detail.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default EditLabelsPage;
