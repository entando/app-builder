import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import PageSearchForm from 'ui/pages/list/PageSearchForm';
import PageTreeContainer from 'ui/pages/common/PageTreeContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AppTourContainer from 'ui/app-tour/AppTourContainer';
import { ROUTE_PAGE_ADD } from 'app-init/router';

class PageTreePage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  renderButton() {
    if (this.props.search) {
      return (
        <Button bsStyle="default" className="pull-right PageTreePage__clear" onClick={this.props.onClear}>
          <FormattedMessage id="pageTree.action.clear" />
        </Button>
      );
    }
    return null;
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
          {this.props.search && (
            <Row>
              <Col xs={12}>
                {this.renderButton()}
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12}>
              <PageTreeContainer
                loading={this.props.loading}
                searchPageCodeToken={this.props.searchPageCodeToken}
              />
            </Col>
          </Row>
          {!this.props.search && (
            <Row>
              <Col xs={12}>
                {this.renderButton()}
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12}>
              <Link to={ROUTE_PAGE_ADD} className="pull-right PageTreePage__save" onClick={() => this.props.onNextStep(6)}>
                <Button
                  bsStyle="primary"
                  className="app-tour-step-5"
                  data-cy="button-step-5"
                  onClick={() => this.props.onNextStep(6)}
                >
                  <FormattedMessage id="app.add" />
                </Button>
              </Link>
            </Col>
          </Row>
          <AppTourContainer customOffset={100} />
        </Grid>
      </InternalPage>
    );
  }
}

PageTreePage.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  search: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  onNextStep: PropTypes.func,
  searchPageCodeToken: PropTypes.string,
};

PageTreePage.defaultProps = {
  search: null,
  loading: false,
  onNextStep: () => {},
  searchPageCodeToken: '',
};

export default PageTreePage;
