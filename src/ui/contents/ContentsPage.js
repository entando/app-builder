import React from 'react';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ContentsContainer from 'ui/contents/ContentsContainer';

const ContentsPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contents.title"
            helpId="cms.contents.tip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ContentsContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentsPage;
