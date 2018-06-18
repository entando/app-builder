import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Link } from '@entando/router';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import PageSearchForm from 'ui/pages/list/PageSearchForm';
import PageTreeContainer from 'ui/pages/common/PageTreeContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_PAGE_ADD } from 'app-init/router';

class PageTreePage extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderButton() {
    if (this.props.search) {
      return (
        <Button bsStyle="default" className="pull-right PageTreePage__clear" onClick={this.props.onClear}>
          <FormattedMessage id="pageTree.action.clear" />
        </Button>
      );
    }
    return (
      <Link route={ROUTE_PAGE_ADD} className="pull-right PageTreePage__save">
        <Button bsStyle="primary">
          <FormattedMessage id="app.add" />
        </Button>
      </Link>
    );
  }

  render() {
    return (
      <InternalPage className="PageTreePage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageTree" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="menu.pageTree" helpId="pageTreePage.help" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <PageSearchForm {...this.props} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {this.renderButton()}
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
  onWillMount: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  search: PropTypes.arrayOf(PropTypes.shape({})),
};

PageTreePage.defaultProps = {
  search: null,
};

export default PageTreePage;
