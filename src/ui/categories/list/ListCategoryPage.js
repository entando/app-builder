import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Link } from '@entando/router';
import { BreadcrumbItem } from 'frontend-common-components';
import CategoryTreeContainer from 'ui/categories/list/CategoryTreeContainer';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

import { ROUTE_CATEGORY_ADD } from 'app-init/router';

const ListCategoryPage = () => (
  <InternalPage className="ListCategoryPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.categories" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="menu.categories" helpId="category.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Link route={ROUTE_CATEGORY_ADD}>
            <Button
              type="button"
              className="pull-right ListCategoryPage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="app.add"
              />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <CategoryTreeContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListCategoryPage;
