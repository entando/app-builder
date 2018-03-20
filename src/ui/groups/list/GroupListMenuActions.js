import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

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

    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>

        <MenuItem className="GroupListMenuAction__menu-item-detail">
          <FormattedMessage id="app.details" />
        </MenuItem>
        <MenuItem className="GroupListMenuAction__menu-item-edit">
          <FormattedMessage id="app.edit" />
        </MenuItem>
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
