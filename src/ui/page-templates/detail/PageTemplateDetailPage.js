import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import SelectedPageTemplateDetailTableContainer from 'ui/page-templates/detail/SelectedPageTemplateDetailTableContainer';
import PageTemplatePageReferencesTableContainer from 'ui/page-templates/detail/PageTemplatePageReferencesTableContainer';
import { ROUTE_PAGE_TEMPLATE_LIST, ROUTE_PAGE_TEMPLATE_EDIT } from 'app-init/router';

export const PageTemplateDetailPageBody = ({ pageTemplateCode }) => (
  <InternalPage className="PageTemplateDetailPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.pageDesigner', active: true },
      { label: 'menu.pageTemplates', to: ROUTE_PAGE_TEMPLATE_LIST },
      { label: 'menu.pageTemplateDetails', active: true },
      ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="menu.pageTemplateDetails" helpId="pageTemplates.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <SelectedPageTemplateDetailTableContainer />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <Link to={routeConverter(ROUTE_PAGE_TEMPLATE_EDIT, { pageTemplateCode })}>
            <Button
              type="button"
              className="pull-right PageTemplateDetailPage__edit-btn"
              bsStyle="primary"
            >
              <FormattedMessage id="app.edit" />
            </Button>
          </Link>
        </Col>
      </Row>
      <br />
      <Row className="form-horizontal">
        <label className="col-xs-2 control-label">
          <FormattedMessage id="references.referencedPages" />
        </label>
        <Col xs={10}>
          <PageTemplatePageReferencesTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

PageTemplateDetailPageBody.propTypes = {
  pageTemplateCode: PropTypes.string.isRequired,
};

export default PageTemplateDetailPageBody;
