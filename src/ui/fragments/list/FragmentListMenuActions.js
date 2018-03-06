import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from 'frontend-common-components';

import PageTreeActionMenuButton from 'ui/pages/common/PageTreeActionMenuButton';
import { ROUTE_FRAGMENT_EDIT } from 'app-init/router';

class FragmentListMenuActions extends Component {
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
    const editLabel = (
      <FormattedMessage id="fragment.table.edit" values={{ code: this.props.code }} />
    );
    return (
      <Dropdown id="FragmentList-dropown">
        <PageTreeActionMenuButton bsRole="toggle" />
        <Dropdown.Menu className="dropdown-menu-right">
          <LinkMenuItem
            id={`edit-${this.props.code}`}
            route={ROUTE_FRAGMENT_EDIT}
            params={{ fragmentCode: this.props.code }}
            label={editLabel}
            className="FragmentListMenuAction__menu-item-edit"
          />
          <MenuItem
            className="FragmentListMenuAction__menu-item-details"
          >
            <FormattedMessage id="fragment.table.details" values={{ code: this.props.code }} />
          </MenuItem>
          <MenuItem
            className="FragmentListMenuAction__menu-item-delete"
            onClick={this.handleClick(onClickDelete)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

FragmentListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

FragmentListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default FragmentListMenuActions;
