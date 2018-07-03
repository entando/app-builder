import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AddFormContainer from 'ui/data-types/attributes/AddFormContainer';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';

const AddDataTypeAttributePage = () => (
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
        titleParam={{ mode: formattedText('app.add') }}
      />
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12} >
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddDataTypeAttributePage;
