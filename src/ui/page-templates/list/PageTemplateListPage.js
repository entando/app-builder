import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import PageTemplateListTableContainer from 'ui/page-templates/list/PageTemplateListTableContainer';
import { ROUTE_PAGE_TEMPLATE_ADD } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';

export const PageTemplateListPageBody = () => (
  <InternalPage className="PageTemplateListPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxComponents" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.pageTemplates" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="menu.pageTemplates"
            helpId="pageTemplates.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTemplateListTableContainer />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <Link to={ROUTE_PAGE_TEMPLATE_ADD}>
            <Button
              type="button"
              className="pull-right PageTemplateListPage__add-btn"
              bsStyle="primary"
            >
              <FormattedMessage id="app.add" />
            </Button>
          </Link>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(MANAGE_PAGES_PERMISSION)(PageTemplateListPageBody);
