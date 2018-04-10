import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AttributeForm from 'ui/common/form/AttributeForm';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';

const AttributePage = () => (
  <InternalPage className="AttributePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.data" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_DATA_TYPE_LIST}>
              <FormattedMessage id="menu.dataType" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.attribute"
        helpId="dataType.help"
      />
      <Row>
        <Col xs={12} >
          <AttributeForm />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AttributePage;
