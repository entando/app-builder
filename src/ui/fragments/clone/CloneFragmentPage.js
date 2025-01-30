import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'patternfly-react';
import { Row, Col } from 'react-bootstrap';

import InternalPage from 'ui/internal-page/InternalPage';
import CloneFormContainer from 'ui/fragments/clone/CloneFormContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
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
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.fragments', to: ROUTE_FRAGMENT_LIST },
          { label: PAGE_TITLE, active: true },
        ]}
        />
        <Grid fluid>
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
