import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import PageSearchForm from 'ui/page-tree-page/PageSearchForm';
import PageTreeContainer from 'ui/pages/common/PageTreeContainer';

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
