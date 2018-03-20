import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import GroupListTableContainer from 'ui/groups/list/GroupListTableContainer';

const ListGroupPage = () => (
  <InternalPage className="ListGroupPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.groups" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.groups"
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button
            type="button"
            className="pull-right ListGroupPage__add"
            bsStyle="primary"
          >
            <FormattedMessage
              id="app.add"
            />
          </Button>
        </Col>
      </Row>
      <Row>
        <GroupListTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListGroupPage;
