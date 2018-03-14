import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

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
      <FormattedMessage id="app.edit" values={{ code: this.props.code }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>

        <MenuItem
          className="DataTypeListMenuAction__menu-item-edit"
          onClick={this.handleClick()}
        >
          {editLabel}
        </MenuItem>
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
