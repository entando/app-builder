import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import GroupDetailTableContainer from 'ui/groups/detail/GroupDetailTableContainer';

const ListGroupPage = () => (
  <InternalPage className="DetailGroupPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem >
              <FormattedMessage id="menu.groups" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.details" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="app.details"
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <GroupDetailTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListGroupPage;
