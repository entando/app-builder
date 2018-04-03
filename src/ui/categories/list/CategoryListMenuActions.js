import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

class CategoryListMenuActions extends Component {
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

        <MenuItem
          className="CategoryListMenuAction__menu-item-detail"
          onClick={this.handleClick()}
        >
          <FormattedMessage id="app.edit" values={{ code: this.props.code }} />
        </MenuItem>
        <MenuItem
          className="CategoryListMenuAction__menu-item-add"
          onClick={this.handleClick()}
        >
          <FormattedMessage id="app.reload" />
        </MenuItem>
        <MenuItem
          className="CategoryListMenuAction__menu-item-edit"
          onClick={this.handleClick()}
        >
          <FormattedMessage id="app.reload" />
        </MenuItem>
        <MenuItem
          className="CategoryListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

CategoryListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

CategoryListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default CategoryListMenuActions;
