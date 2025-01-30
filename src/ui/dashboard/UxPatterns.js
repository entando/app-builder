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
import { hasAccess } from '@entando/utils';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { SUPERUSER_PERMISSION } from 'state/permissions/const';

import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

import { ROUTE_PAGE_TEMPLATE_LIST, ROUTE_WIDGET_ADD, ROUTE_WIDGET_LIST } from 'app-init/router';

class UxPatterns extends Component {
  componentDidMount() {
    const { onDidMount, userPermissions } = this.props;
    if (hasAccess(SUPERUSER_PERMISSION, userPermissions)) {
      onDidMount();
    }
  }

  render() {
    const { isSuperuser } = this.props;

    return (
      <Card accented className="UxPatternsCard">
        <ViewPermissionNoticeOverlay viewPermissions={[SUPERUSER_PERMISSION]}>
          <CardTitle>
            <div className="left-title">
              <Icon
                type="lucide"
                name="components"
                background
                className="icon-flipped-y primary"
              />
              <FormattedMessage id="menu.uxComponents" />
            </div>
            {isSuperuser && (
              <Button
                bsStyle="link"
                className="primary pull-right"
                componentClass={Link}
                to={ROUTE_WIDGET_ADD}
              >
                <Icon name="plus" type="lucide" className="primary" />
                <FormattedMessage id="app.add" />
              </Button>
            )}
          </CardTitle>
          <CardBody>
            <div className="card-pf-aggregate-status-container">
              <Icon name="box" type="lucide" strokeWidth={2} />
              <AggregateStatusCount>
                {this.props.widgets}&nbsp;
                <Link to={ROUTE_WIDGET_LIST}>
                  <FormattedMessage id="dashboard.uxComponents.mfeWidgets" />
                </Link>
              </AggregateStatusCount>
            </div>
            <div className="card-pf-aggregate-status-container">
              <Icon name="pages" type="lucide" className="icon-flipped-x" strokeWidth={2} />
              <AggregateStatusCount>
                {this.props.pageTemplates}&nbsp;
                <Link to={ROUTE_PAGE_TEMPLATE_LIST}>
                  <FormattedMessage id="dashboard.uxComponents.pageTemplates" />
                </Link>
              </AggregateStatusCount>
            </div>
          </CardBody>
        </ViewPermissionNoticeOverlay>
      </Card>
    );
  }
}

UxPatterns.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  widgets: PropTypes.number.isRequired,
  pageTemplates: PropTypes.number.isRequired,
  isSuperuser: PropTypes.bool,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

UxPatterns.defaultProps = {
  isSuperuser: true,
  userPermissions: [],
};

export default UxPatterns;
