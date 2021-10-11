import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import EditContentTypeFormContainer from 'ui/content-type/EditContentTypeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/router';

const EditContentTypePage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_CMS_CONTENTTYPE_LIST}>
              <FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contenttype.edit.label" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contenttype.edit.label"
            helpId="cms.contenttype.titletip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EditContentTypeFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditContentTypePage;
