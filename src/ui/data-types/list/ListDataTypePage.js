import React from 'react';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import DataTypeListTableContainer from 'ui/data-types/list/DataTypeListTableContainer';
import { ROUTE_DATA_TYPE_ADD } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const ListDataTypePageBody = () => (
  <InternalPage className="ListDataTypePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.data' },
      { label: 'menu.dataType', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="dataType.list.title"
            helpId="dataType.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Link to={ROUTE_DATA_TYPE_ADD} className="pull-right">
            <Button className="DataType__add" bsStyle="primary" >
              <FormattedMessage id="app.new" />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <DataTypeListTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(ListDataTypePageBody);
