import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, Grid } from 'patternfly-react';
import { Row, Col } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import CloneFormContainer from 'ui/fragments/clone/CloneFormContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';

const FRAGMENT_HELP = 'fragment.help';
const PAGE_TITLE = 'app.clone';

class CloneFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="CloneFragmentPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_FRAGMENT_LIST}>
                  <FormattedMessage id="menu.fragments" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id={PAGE_TITLE} />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId={PAGE_TITLE} helpId={FRAGMENT_HELP} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <CloneFormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

CloneFragmentPage.propTypes = {
  onWillMount: PropTypes.func,
};

CloneFragmentPage.defaultProps = {
  onWillMount: () => {},
};

export default CloneFragmentPage;
