import React from 'react';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ContentVersionDetailsContainer from 'ui/versioning/details/ContentVersionDetailsContainer';

const ContentVersionDetailsPage = () => (
  <Grid>
    <Row>
      <Col>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to="/cms/versioning">
            <FormattedMessage id="cms.versioning.title" defaultMessage="Versioning" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.versioning.contentdetails" defaultMessage="Version Details" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        <CMSPageTitle
          titleId="cms.versioning.title"
          helpId="cms.versioning.titletip"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ContentVersionDetailsContainer />
      </Col>
    </Row>
  </Grid>
);

export default ContentVersionDetailsPage;
