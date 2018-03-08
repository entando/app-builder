import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';

import { Grid, Col, Row, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

const PageConfig = () => (
  <InternalPage className="PageSettings">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem route="home" active>
              <FormattedMessage id="menu.pageDesigner" />
            </BreadcrumbItem>
            <BreadcrumbItem route="home">
              <FormattedMessage id="menu.pageSettings" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={6} xsOffset={6} >
          <ToolbarPageConfig />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default PageConfig;
