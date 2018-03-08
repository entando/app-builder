import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FragmentListTableContainer from 'ui/fragments/list/FragmentListTableContainer';
import FragmentSearchFormContainer from 'ui/fragments/list/FragmentSearchFormContainer';
import { ROUTE_FRAGMENT_ADD } from 'app-init/router';

const ListFragmentPage = () => (
  <InternalPage className="ListFragmentPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.fragments" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="fragment.list.title"
            helpId="fragment.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} mdOffset={3}>
          <FragmentSearchFormContainer />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Link route={ROUTE_FRAGMENT_ADD}>
            <Button
              type="button"
              className="pull-right ListFragmentPage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="app.new"
              />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <FragmentListTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListFragmentPage;
