import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import PagesAddFormContainer from 'ui/pages/add/PagesAddFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_PAGE_TREE } from 'app-init/router';


class PagesAddPage extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="PagesAddPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem route={ROUTE_PAGE_TREE}>
                  <FormattedMessage id="menu.pageTree" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="app.add" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="app.add" helpId="pageTreePage.help" />
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
