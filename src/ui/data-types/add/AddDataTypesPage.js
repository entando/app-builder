import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DataTypeFormContainer from 'ui/data-types/common/DataTypeFormContainer';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';

const AddDataTypesPage = () => (
  <InternalPage className="AddDataTypesPage">
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
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.add"
            helpId="dataType.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} >
          <DataTypeFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddDataTypesPage;
