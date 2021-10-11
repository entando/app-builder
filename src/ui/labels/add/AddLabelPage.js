import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/labels/add/AddFormContainer';
import { ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const AddLabelPageBody = () => (
  <InternalPage className="AddLabelPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxComponents" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_LABELS_AND_LANGUAGES}>
              <FormattedMessage id="menu.labelsAndLanguages" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxComponents.addLabels" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
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
