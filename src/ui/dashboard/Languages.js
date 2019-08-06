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
import { FormattedMessage } from 'react-intl';
import { Clearfix } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';

class Languages extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <Card accented>
        <CardTitle>
          <Icon size="lg" name="flag" />
          <FormattedMessage id="dashboard.languages" />
          <Button
            bsStyle="primary"
            className="pull-right"
            componentClass={Link}
            to={ROUTE_LABELS_AND_LANGUAGES}
          >
            <FormattedMessage id="app.details" />
          </Button>
          <Clearfix />
        </CardTitle>
        <CardBody>
          <span className="separator" />
          <AggregateStatusCount>
            <b>{this.props.activeLanguages}</b> <FormattedMessage id="dashboard.activeLanguages" />
          </AggregateStatusCount>
        </CardBody>
      </Card>
    );
  }
}

Languages.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  activeLanguages: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Languages;
