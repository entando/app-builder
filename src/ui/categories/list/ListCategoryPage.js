import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import CategoryTreeContainer from 'ui/categories/list/CategoryTreeContainer';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_CATEGORIES_PERMISSION } from 'state/permissions/const';
import { ROUTE_CATEGORY_ADD } from 'app-init/router';

export const ListCategoryPageBody = () => (
  <InternalPage className="ListCategoryPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.cms" />
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
        <CategoryTreeContainer />
      </Row>
      <Row>
        <Col xs={12}>
          <Link to={ROUTE_CATEGORY_ADD}>
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
    </Grid>
  </InternalPage>
);

export default withPermissions(MANAGE_CATEGORIES_PERMISSION)(ListCategoryPageBody);
