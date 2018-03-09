import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from 'frontend-common-components';

import { ROUTE_DATA_TYPE_EDIT } from 'app-init/router';

class DataTypeListMenuActions extends Component {
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
      <FormattedMessage id="datatype.table.edit" values={{ code: this.props.code }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        <LinkMenuItem
          id={`edit-${this.props.code}`}
          route={ROUTE_DATA_TYPE_EDIT}
          params={{ dataTypeCode: this.props.code }}
          label={editLabel}
          className="DataTypeListMenuAction__menu-item-edit"
        />
        <MenuItem
          className="DataTypeListMenuAction__menu-item-reload"
          onClick={this.handleClick()}
        >
          <FormattedMessage id="app.reload" />
        </MenuItem>
        <MenuItem
          className="DataTypeListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

DataTypeListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

DataTypeListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default DataTypeListMenuActions;
