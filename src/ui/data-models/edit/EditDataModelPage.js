import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import DataModelFormContainer from 'ui/data-models/edit/EditDataModelFormContainer';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';

const EditDataModelPage = () => (
  <InternalPage className="EditDataModelPage">
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
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.edit"
        helpId="dataModel.help"
      />
      <Row>
        <Col xs={12} >
          <ErrorsAlertContainer />
          <DataModelFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditDataModelPage;
