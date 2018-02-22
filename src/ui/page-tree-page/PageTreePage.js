import React from 'react';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import { BreadcrumbItem } from 'frontend-common-components';

import PageTreeContainer from 'ui/page-tree/PageTreeContainer';

const PageTreePage = () => (
  <InternalPage className="PageTreePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.pageCreator" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.pageTree" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1 className="InternalPage__page-title">
            <FormattedMessage id="menu.pageTree" />
            <i className="pficon pficon-help pull-right" />
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTreeContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default PageTreePage;
