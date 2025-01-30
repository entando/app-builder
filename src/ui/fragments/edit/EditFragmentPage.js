import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'patternfly-react';
import { Row, Col } from 'react-bootstrap';

import InternalPage from 'ui/internal-page/InternalPage';
import EditFormContainer from 'ui/fragments/edit/EditFormContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';

const FRAGMENT_HELP = 'fragment.help';
const PAGE_TITLE = 'app.edit';

class EditFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    return (
      <InternalPage className="EditFragmentPage">
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
              <EditFormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

EditFragmentPage.propTypes = {
  onWillMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
};

EditFragmentPage.defaultProps = {
  onWillMount: () => {},
  onWillUnmount: () => {},
};

export default EditFragmentPage;
