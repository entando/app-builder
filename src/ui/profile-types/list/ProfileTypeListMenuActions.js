import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from 'frontend-common-components';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_PROFILE_TYPE_EDIT } from 'app-init/router';

class ProfileTypeListMenuActions extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props.code); }
    };
  }

  render() {
    const { onClickDelete } = this.props;
    const editLabel = (
      <FormattedMessage id="app.edit" values={{ code: this.props.code }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        <LinkMenuItem
          id={`profileType-${this.props.code}`}
          route={ROUTE_PROFILE_TYPE_EDIT}
          params={{ profiletypeCode: this.props.code }}
          label={editLabel}
          className="ProfileTypeListMenuAction__menu-item-edit"
        />
        <MenuItem
          className="ProfileTypeListMenuAction__menu-item-reload"
          onClick={this.handleClick()}
        >
          <FormattedMessage id="app.reload" />
        </MenuItem>
        <MenuItem
          className="ProfileTypeListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

ProfileTypeListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

ProfileTypeListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default ProfileTypeListMenuActions;
