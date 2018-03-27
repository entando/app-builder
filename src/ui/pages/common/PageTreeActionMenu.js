import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown, MenuItem } from 'patternfly-react';
import PageTreeActionMenuButton from 'ui/pages/common/PageTreeActionMenuButton';
import { PAGE_STATUS_PUBLISHED } from 'state/pages/const';

class PageTreeActionMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) {
        handler(this.props.page);
      }
    };
  }
  render() {
    const {
      page, onClickAdd, onClickEdit, onClickConfigure, onClickDetails,
      onClickClone, onClickDelete, onClickPublish, onClickUnpublish,
    } = this.props;

    const changePublishStatus = page.status === PAGE_STATUS_PUBLISHED ?
      (
        <MenuItem
          className="PageTreeActionMenuButton__menu-item-unpublish"
          onClick={this.handleClick(onClickUnpublish)}
        >
          <FormattedMessage id="app.unpublish" />
        </MenuItem>
      ) :
      (
        <MenuItem
          className="PageTreeActionMenuButton__menu-item-publish"
          onClick={this.handleClick(onClickPublish)}
        >
          <FormattedMessage id="app.publish" />
        </MenuItem>
      );

    return (
      <Dropdown id="PageTreeActionMenuButton">
        <PageTreeActionMenuButton bsRole="toggle" />
        <Dropdown.Menu className="dropdown-menu-right">
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-add"
            onClick={this.handleClick(onClickAdd)}
          >
            <FormattedMessage id="app.add" />
          </MenuItem>
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-edit"
            onClick={this.handleClick(onClickEdit)}
          >
            <FormattedMessage id="app.edit" />
          </MenuItem>
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-configure"
            onClick={this.handleClick(onClickConfigure)}
          >
            <FormattedMessage id="app.configure" />
          </MenuItem>
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-details"
            onClick={this.handleClick(onClickDetails)}
          >
            <FormattedMessage id="app.details" />
          </MenuItem>
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-clone"
            onClick={this.handleClick(onClickClone)}
          >
            <FormattedMessage id="app.clone" />
          </MenuItem>
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-delete"
            onClick={this.handleClick(onClickDelete)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
          { changePublishStatus }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

PageTreeActionMenu.propTypes = {
  page: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
  onClickAdd: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickConfigure: PropTypes.func,
  onClickDetails: PropTypes.func,
  onClickClone: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickPublish: PropTypes.func,
  onClickUnpublish: PropTypes.func,
};

PageTreeActionMenu.defaultProps = {
  onClickAdd: null,
  onClickEdit: null,
  onClickConfigure: null,
  onClickDetails: null,
  onClickClone: null,
  onClickDelete: null,
  onClickPublish: null,
  onClickUnpublish: null,
};

export default PageTreeActionMenu;
