import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddLabelsPageContainer from 'ui/labels/add/AddLabelsPageContainer';

const AddLabelsPage = () => (

  <InternalPage className="AddLabelsPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern.addLabels" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.add"
        helpId="label.detail.help"
      />
      <Row>
        <Col xs={12}>
          <AddLabelsPageContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default AddLabelsPage;
