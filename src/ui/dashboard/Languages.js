import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  AggregateStatusCount,
} from 'patternfly-react';
import Icon from 'ui/common/icon/Icon';
import Button from 'ui/common/Button';
import { FormattedMessage } from 'react-intl';

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
            <div className="left-title">
              <Icon type="lucide" name="flag" background className="primary" />
              <FormattedMessage id="dashboard.languages" />
            </div>
            <Button
              bsStyle="link"
              className="primary pull-right"
              componentClass={Link}
              to={ROUTE_LABELS_AND_LANGUAGES}
            >
              <Icon name="plus" type="lucide" className="primary" />
              <FormattedMessage id="app.details" />
            </Button>
          </CardTitle>
          <CardBody>
            <AggregateStatusCount>
              {this.props.activeLanguages}&nbsp;
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
