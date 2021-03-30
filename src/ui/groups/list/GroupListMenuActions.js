import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { ROUTE_GROUP_EDIT, ROUTE_GROUP_DETAIL } from 'app-init/router';

class GroupListMenuActions extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props); }
    };
  }

  render() {
    const { onClickDelete } = this.props;

    const editLabel = <FormattedMessage id="app.edit" />;
    const editDetails = <FormattedMessage id="app.details" />;
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        <LinkMenuItem
          id={`detail-${this.props.code}`}
          to={routeConverter(ROUTE_GROUP_DETAIL, { groupname: this.props.code })}
          label={editDetails}
          className="GroupListMenuAction__menu-item-detail"
        />
        <LinkMenuItem
          id={`edit-${this.props.code}`}
          to={routeConverter(ROUTE_GROUP_EDIT, { groupCode: this.props.code })}
          label={editLabel}
          className="GroupListMenuAction__menu-item-edit"
        />
        <MenuItem
          className="GroupListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
          data-testid="group-delete-action"
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

GroupListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

GroupListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default GroupListMenuActions;
