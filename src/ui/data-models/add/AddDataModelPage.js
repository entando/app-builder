import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DataModelFormContainer from 'ui/data-models/common/DataModelFormContainer';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';

const AddDataModelPage = () => (
  <InternalPage className="AddDataModelPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.data" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_DATA_MODEL_LIST}>
              <FormattedMessage id="menu.dataModels" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.add"
        helpId="dataModel.help"
      />
      <Row>
        <Col xs={12} >
          <DataModelFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddDataModelPage;
