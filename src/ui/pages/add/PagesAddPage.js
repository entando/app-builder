import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PagesAddFormContainer from 'ui/pages/add/PagesAddFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AppTourContainer from 'ui/app-tour/AppTourContainer';
import { ROUTE_PAGE_TREE } from 'app-init/router';


class PagesAddPage extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="PagesAddPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.pageDesigner' },
          { label: 'menu.pageTree', to: { ROUTE_PAGE_TREE } },
          { label: 'app.add', active: true },
        ]}
        />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="app.add" helpId="pageTreePage.help" data-testid="add-new-page" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PagesAddFormContainer />
            </Col>
          </Row>
          <AppTourContainer />
        </Grid>
      </InternalPage>
    );
  }
}

PagesAddPage.propTypes = {
  onWillMount: PropTypes.func,
};

PagesAddPage.defaultProps = {
  onWillMount: null,
};

export default PagesAddPage;
