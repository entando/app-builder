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
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';

import { ROUTE_WIDGET_ADD } from 'app-init/router';

class UxPatterns extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <Card accented>
        <CardTitle>
          <Icon size="lg" name="user" />
          <FormattedMessage id="menu.uxPattern" />
          <Button className="pull-right" componentClass={Link} route={ROUTE_WIDGET_ADD} >
            <FormattedMessage id="dashboard.newWidget" />
          </Button>
          <Clearfix />
        </CardTitle>
        <CardBody>
          <Icon size="lg" name="user" />
          <AggregateStatusCount>
            <b>{this.props.widgets}</b> <FormattedMessage id="menu.widgets" />
          </AggregateStatusCount>
          <Icon size="lg" name="user" />
          <AggregateStatusCount>
            <b>{this.props.pageModels}</b> <FormattedMessage id="menu.pageModels" />
          </AggregateStatusCount>
        </CardBody>
      </Card>
    );
  }
}

UxPatterns.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  widgets: PropTypes.number.isRequired,
  pageModels: PropTypes.number.isRequired,
};

export default UxPatterns;
