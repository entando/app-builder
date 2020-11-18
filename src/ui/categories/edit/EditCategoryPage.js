import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import EditFormContainer from 'ui/categories/edit/EditFormContainer';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_CATEGORY_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_CATEGORIES_PERMISSION } from 'state/permissions/const';

export const EditCategoryPageBody = () => (
  <InternalPage className="EditCategoryPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.cms" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_CATEGORY_LIST}>
              <FormattedMessage id="menu.categories" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.edit" helpId="category.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(MANAGE_CATEGORIES_PERMISSION)(EditCategoryPageBody);
