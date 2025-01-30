import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col } from 'patternfly-react';
import { Link } from 'react-router-dom';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import PageSearchForm from 'ui/pages/list/PageSearchForm';
import PageTreeContainer from 'ui/pages/common/PageTreeContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import ModalPageSettings from 'ui/pages/settings/ModalPageSettings';
import Button from 'ui/common/Button';
import AppTourContainer from 'ui/app-tour/AppTourContainer';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { withPermissionValues } from 'ui/auth/withPermissions';
import Icon from 'ui/common/icon/Icon';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';


class PageTreePage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
    this.setState({ open: false });
  }

  renderButton() {
    if (this.props.search) {
      return (
        <Button bsStyle="link" className="pull-right PageTreePage__clear" onClick={this.props.onClear}>
          <FormattedMessage id="pageTree.action.clear" />
        </Button>
      );
    }
    return null;
  }

  render() {
    return (
      <InternalPage className="PageTreePage">
        <HeaderBreadcrumb breadcrumbs={[{ label: 'menu.pageDesigner', active: true }, { label: 'menu.pageTree', active: true }]} />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="menu.pageTree" helpId="pageTreePage.help" data-testid="page-tree" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }} className="pageTreeSearch">
                <PageSearchForm {...this.props} />
                <Button
                  className="btn-clear-secondary"
                  onClick={() => this.setState({ open: true })}
                >
                  <Icon name="gear" />
                  <FormattedMessage id="app.settings" />
                </Button>
              </div>

            </Col>
          </Row>
          {this.props.search && (
          <Row>
            <Col xs={12} className="PageTreePage__btn-clear-container">
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
                  bsStyle="link"
                  className="app-tour-step-5"
                  data-testid="button-step-5"
                  onClick={() => this.props.onNextStep(6)}
                >
                  <FormattedMessage id="app.add" />
                </Button>
              </Link>
            </Col>
          </Row>
          <AppTourContainer customOffset={100} />
        </Grid>
        <Col xs={12} md={4}>
          <ModalPageSettings
            show={this.state.open}
            onHide={() => this.setState({ open: false })}
          />
        </Col>
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
  onNextStep: () => { },
  searchPageCodeToken: '',
};

export const PageTreePageBody = PageTreePage;

export default withPermissionValues(PageTreePage);
