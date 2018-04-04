import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import RoleListTableContainer from 'ui/roles/list/RoleListTableContainer';

const ListRolePage = () => (
  <InternalPage className="ListRolePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userSettings" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.roles" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.roles"
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/* <Link route={ROUTE_GROUP_ADD}>
            <Button
              type="button"
              className="pull-right ListRolePage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="app.add"
              />
            </Button>
          </Link> */}
        </Col>
      </Row>
      <Row>
        <RoleListTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListRolePage;
