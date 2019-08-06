import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AddDataModelFormContainer from 'ui/data-models/add/AddDataModelFormContainer';
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
            <BreadcrumbItem to={ROUTE_DATA_MODEL_LIST}>
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
          <ErrorsAlertContainer />
          <AddDataModelFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddDataModelPage;
