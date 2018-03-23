import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_GROUP_EDIT } from 'app-init/router';

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
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        <MenuItem className="GroupListMenuAction__menu-item-detail">
          <FormattedMessage id="app.details" />
        </MenuItem>
        <LinkMenuItem
          id={`edit-${this.props.code}`}
          route={ROUTE_GROUP_EDIT}
          params={{ groupCode: this.props.code }}
          label={editLabel}
          className="GroupListMenuAction__menu-item-edit"
        />
        <MenuItem
          className="GroupListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
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
