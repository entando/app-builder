import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
// import { LinkMenuItem } from 'frontend-common-components';
// import { ROUTE_GROUP_EDIT, ROUTE_GROUP_DETAIL } from 'app-init/router';

class RoleListMenuActions extends Component {
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

    // const editLabel = <FormattedMessage id="app.edit" />;
    // const editDetails = <FormattedMessage id="app.details" />;
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        {/* <LinkMenuItem
          id={`detail-${this.props.code}`}
          route={ROUTE_GROUP_DETAIL}
          params={{ groupname: this.props.code }}
          label={editDetails}
          className="RoleListMenuAction__menu-item-detail"
        />
        <LinkMenuItem
          id={`edit-${this.props.code}`}
          route={ROUTE_GROUP_EDIT}
          params={{ groupCode: this.props.code }}
          label={editLabel}
          className="RoleListMenuAction__menu-item-edit"
        /> */}
        <MenuItem
          className="RoleListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

RoleListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

RoleListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default RoleListMenuActions;
