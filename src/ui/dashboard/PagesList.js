import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';

import { ROUTE_PAGE_ADD } from 'app-init/router';

class PagesList extends Component {
  componentDidMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <div className="PagesList">
        <h2>
          List of Pages
          <Button
            bsStyle="primary"
            className="pull-right"
            componentClass={Link}
            route={ROUTE_PAGE_ADD}
          >
            <FormattedMessage id="dashboard.newPage" />
          </Button>
          <Clearfix />
        </h2>
      </div>
    );
  }
}

PagesList.propTypes = {
  onWillMount: PropTypes.func.isRequired,
};

export default PagesList;
