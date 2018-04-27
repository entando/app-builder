import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  AggregateStatusCount,
  Icon,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

class Integrations extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <Card accented>
        <CardTitle>
          <Icon size="lg" name="cubes" />
          <FormattedMessage id="menu.integration" />
        </CardTitle>
        <CardBody>
          <AggregateStatusCount>
            <b>{this.props.plugins}</b> <FormattedMessage id="menu.components" />
          </AggregateStatusCount>
          <span className="separator" />
          <AggregateStatusCount>
            <b>{this.props.apis}</b> <FormattedMessage id="dashboard.apis" />
          </AggregateStatusCount>
        </CardBody>
      </Card>
    );
  }
}

Integrations.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  plugins: PropTypes.number.isRequired,
  apis: PropTypes.number.isRequired,
};

export default Integrations;
