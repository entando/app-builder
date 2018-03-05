import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown, MenuItem } from 'patternfly-react';
import PageTreeActionMenuButton from 'ui/pages/common/PageTreeActionMenuButton';


class FragmentListMenuAction extends Component {
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
      <Dropdown id="widgetList-dropown">
        <PageTreeActionMenuButton bsRole="toggle" />
        <Dropdown.Menu className="dropdown-menu-right">
          <MenuItem
            className="WidgetListMenuAction__menu-item-delete"
            onClick={this.handleClick(onClickDelete)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

FragmentListMenuAction.propTypes = {
  onClickDelete: PropTypes.func,
};

FragmentListMenuAction.defaultProps = {
  onClickDelete: null,
};

export default FragmentListMenuAction;
