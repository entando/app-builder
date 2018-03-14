import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PageConfigGridContainer from 'ui/pages/config/PageConfigGridContainer';
import ToolbarPageConfigContainer from 'ui/pages/config/ToolbarPageConfigContainer';


class PageConfigPage extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  componentWillUnmount() {
    if (this.props.onWillUnmount) this.props.onWillUnmount(this.props);
  }

  render() {
    return (
      <InternalPage className="PageConfigPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.pageCreator" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageConfig" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <PageConfigGridContainer />
            </Col>
            <Col xs={2}>
              <ToolbarPageConfigContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

PageConfigPage.propTypes = {
  onWillMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
};

PageConfigPage.defaultProps = {
  onWillMount: null,
  onWillUnmount: null,
};

export default PageConfigPage;
