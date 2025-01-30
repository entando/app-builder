import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PagesEditFormContainer from 'ui/pages/edit/PagesEditFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_PAGE_TREE } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';

export class PagesEditPageBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="PagesEditPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.pageDesigner' },
          { label: 'menu.pageTree', to: { ROUTE_PAGE_TREE } },
          { label: 'app.edit', active: true },
        ]}
        />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="app.edit" helpId="pageTreePage.help" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PagesEditFormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

PagesEditPageBody.propTypes = {
  onWillMount: PropTypes.func,
};

PagesEditPageBody.defaultProps = {
  onWillMount: null,
};

export default withPermissions(MANAGE_PAGES_PERMISSION)(PagesEditPageBody);
