import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DetailCategoryTableContainer from 'ui/categories/detail/DetailCategoryTableContainer';
import { ROUTE_CATEGORY_LIST } from 'app-init/router';

const DetailCategoryPage = () => (
  <InternalPage className="DetailCategoryPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_CATEGORY_LIST}>
              <FormattedMessage id="menu.categories" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.details" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.details" helpId="category.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <DetailCategoryTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default DetailCategoryPage;
