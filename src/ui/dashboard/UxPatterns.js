import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  AggregateStatusCount,
  Icon,
  Button,
} from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { ROUTE_WIDGET_ADD } from 'app-init/router';

class UxPatterns extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { isSuperuser } = this.props;
    return (
      <Card accented>
        <CardTitle>
          <Icon size="lg" name="object-ungroup" />
          <FormattedMessage id="menu.uxComponents" />
          {isSuperuser && (
            <Button
              bsStyle="primary"
              className="pull-right"
              componentClass={Link}
              to={ROUTE_WIDGET_ADD}
            >
              <FormattedMessage id="app.new" />
            </Button>
          )}
          <Clearfix />
        </CardTitle>
        <CardBody>
          <Icon size="lg" name="cube" />
          <AggregateStatusCount>
            <b>{this.props.widgets}</b> <FormattedMessage id="menu.widgets" />
          </AggregateStatusCount>
          <span className="separator" />
          <AggregateStatusCount>
            <b>{this.props.pageTemplates}</b> <FormattedMessage id="menu.pageTemplates" />
          </AggregateStatusCount>
        </CardBody>
      </Card>
    );
  }
}

UxPatterns.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  widgets: PropTypes.number.isRequired,
  pageTemplates: PropTypes.number.isRequired,
  isSuperuser: PropTypes.bool,
};

UxPatterns.defaultProps = {
  isSuperuser: true,
};

export default UxPatterns;
