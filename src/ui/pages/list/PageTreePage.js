import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Link } from '@entando/router';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageSearchForm from 'ui/pages/list/PageSearchForm';
import PageTreeContainer from 'ui/pages/common/PageTreeContainer';
import { ROUTE_PAGE_ADD } from 'app-init/router';

class PageTreePage extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  render() {
    return (
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
            <Col md={6} mdOffset={3}>
              <PageSearchForm />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Link route={ROUTE_PAGE_ADD} className="pull-right">
                <Button bsStyle="primary">
                  <FormattedMessage id="app.add" />
                </Button>
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <PageTreeContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

PageTreePage.propTypes = {
  onWillMount: PropTypes.func,
};

PageTreePage.defaultProps = {
  onWillMount: null,
};

export default PageTreePage;
