import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_PAGE_MODEL_LIST } from 'app-init/router';
import PageModelFormContainer from 'ui/page-models/common/PageModelFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';


class PageModelAddPage extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="PageModelAddPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageCreator" />
                </BreadcrumbItem>
                <BreadcrumbItem route={ROUTE_PAGE_MODEL_LIST}>
                  <FormattedMessage id="menu.pageModels" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="app.add" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="app.add" helpId="pageModels.help" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageModelFormContainer mode="add" />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

PageModelAddPage.propTypes = {
  onWillMount: PropTypes.func,
};

PageModelAddPage.defaultProps = {
  onWillMount: null,
};

export default PageModelAddPage;
