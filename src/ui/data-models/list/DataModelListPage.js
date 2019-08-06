import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import InternalPage from 'ui/internal-page/InternalPage';
import DataModelSearchFormContainer from 'ui/data-models/list/DataModelSearchFormContainer';
import DataModelListTableContainer from 'ui/data-models/list/DataModelListTableContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { ROUTE_DATA_MODEL_ADD } from 'app-init/router';

const DataModelListPage = () => (
  <InternalPage className="DataModelListPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.data" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.dataModels" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.dataModels"
            helpId="datamodel.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} mdOffset={3}>
          <DataModelSearchFormContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Link to={ROUTE_DATA_MODEL_ADD} className="pull-right">
            <Button className="Datamodel__add" bsStyle="primary" >
              <FormattedMessage id="app.new" />
            </Button>
          </Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <DataModelListTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default DataModelListPage;
