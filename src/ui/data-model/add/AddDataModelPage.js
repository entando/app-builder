import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DataModelFormContainer from 'ui/data-model/common/DataModelFormContainer';

const AddDataModelPage = () => (
  <InternalPage className="AddFragmentPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.data" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <FormattedMessage id="menu.dataModel" />
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
