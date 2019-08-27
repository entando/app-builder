import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';

import { ROUTE_FRAGMENT_EDIT, ROUTE_FRAGMENT_DETAIL } from 'app-init/router';

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
    const detailLabel = (
      <FormattedMessage id="fragment.table.details" values={{ code: this.props.code }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        <LinkMenuItem
          id={`edit-${this.props.code}`}
          to={routeConverter(ROUTE_FRAGMENT_EDIT, { fragmentCode: this.props.code })}
          label={editLabel}
          className="FragmentListMenuAction__menu-item-edit"
        />
        <LinkMenuItem
          id={`edit-${this.props.code}`}
          to={routeConverter(ROUTE_FRAGMENT_DETAIL, { fragmentCode: this.props.code })}
          label={detailLabel}
          className="FragmentListMenuAction__menu-item-details"
        />
        <MenuItem
          className="FragmentListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
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
