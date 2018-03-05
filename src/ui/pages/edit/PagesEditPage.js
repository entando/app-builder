import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_PAGE_TREE } from 'app-init/router';
import PagesEditFormContainer from 'ui/pages/edit/PagesEditFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';


class PagesEditPage extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="PagesEditPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageCreator" />
                </BreadcrumbItem>
                <BreadcrumbItem route={ROUTE_PAGE_TREE}>
                  <FormattedMessage id="menu.pageTree" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="app.edit" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
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

PagesEditPage.propTypes = {
  onWillMount: PropTypes.func,
};

PagesEditPage.defaultProps = {
  onWillMount: null,
};

export default PagesEditPage;
