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
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

import { ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';

class Languages extends Component {
  componentDidMount() {
    const { onDidMount, isSuperuser } = this.props;
    if (isSuperuser) {
      onDidMount();
    }
  }

  render() {
    return (
      <Card accented className="LanguagesCard">
        <ViewPermissionNoticeOverlay viewPermissions={[SUPERUSER_PERMISSION]}>
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
              <b>{this.props.activeLanguages}</b>&nbsp;
              <Link to={ROUTE_LABELS_AND_LANGUAGES}>
                <FormattedMessage id="dashboard.activeLanguages" />
              </Link>
            </AggregateStatusCount>
          </CardBody>
        </ViewPermissionNoticeOverlay>
      </Card>
    );
  }
}

Languages.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  activeLanguages: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  isSuperuser: PropTypes.bool,
};

Languages.defaultProps = {
  isSuperuser: false,
};

export default Languages;
