import React from 'react';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import SingleContentCurrentVersionContainer from 'ui/versioning/SingleContentCurrentVersionContainer';
import SingleContentVersioningHistoryContainer from 'ui/versioning/SingleContentVersioningHistoryContainer';

const SingleContentVersioningHistoryPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.versioning.title" defaultMessage="Versioning" />
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
          <SingleContentCurrentVersionContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <SingleContentVersioningHistoryContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default SingleContentVersioningHistoryPage;
