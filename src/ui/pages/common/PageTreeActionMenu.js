import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';
import { NEXT_PAGE_TYPE } from 'ui/pages/common/const';
import getRuntimeEnv from 'helpers/getRuntimeEnv';
import { openInNewTab } from 'helpers/urlUtils';

const { WEBUI_APP_URL, WEBUI_DEV_WORKSPACE_URL } = getRuntimeEnv();

class PageTreeActionMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickViewPublishedPage = this.handleClickViewPublishedPage.bind(this);
    this.handleClickPreview = this.handleClickPreview.bind(this);
  }

  handleClick(handler) {
    return () => handler && handler(this.props.page);
  }

  handleClickViewPublishedPage(handler) {
    return () => handler && handler(this.props.page, this.props.domain, this.props.locale);
  }

  handleClickPreview(handler) {
    return () => handler && handler(this.props.page, this.props.domain);
  }

  render() {
    const {
      page, onClickAdd, onClickEdit, onClickConfigure, onClickDetails,
      onClickClone, onClickDelete, onClickPublish, onClickUnpublish,
      onClickViewPublishedPage, onClickPreview,
    } = this.props;

    let disabled = false;
    if (!page.isEmpty && page.status === PAGE_STATUS_PUBLISHED) {
      disabled = true;
    }
    if (page.expanded) {
      disabled = page.hasPublishedChildren;
    }
    const changePublishStatus = page.status === PAGE_STATUS_PUBLISHED ?
      (
        <MenuItem
          disabled={disabled}
          className="PageTreeActionMenuButton__menu-item-unpublish"
          onSelect={this.handleClick(onClickUnpublish)}
        >
          <FormattedMessage id="app.unpublish" />
        </MenuItem>
      ) :
      (
        <MenuItem
          disabled={
            page.status === PAGE_STATUS_UNPUBLISHED && page.parentStatus === PAGE_STATUS_UNPUBLISHED
          }
          className="PageTreeActionMenuButton__menu-item-publish"
          onSelect={this.handleClick(onClickPublish)}
        >
          <FormattedMessage id="app.publish" />
        </MenuItem>
      );

    const viewPublishedPage = page.status === PAGE_STATUS_PUBLISHED ?
      (
        <MenuItem
          disabled={false}
          className="PageTreeActionMenuButton__menu-item-viewPublishedPage"
          onClick={this.handleClickViewPublishedPage(onClickViewPublishedPage)}
        >
          <FormattedMessage id="pageTree.viewPublishedPage" />
        </MenuItem>
      ) :
      (
        <MenuItem
          disabled
          className="PageTreeActionMenuButton__menu-item-viewPublishedPage"
        >
          <FormattedMessage id="pageTree.viewPublishedPage" />
        </MenuItem>
      );

    const renderDeleteItem = () => (
      <MenuItem
        disabled={!page.isEmpty || page.status === PAGE_STATUS_PUBLISHED}
        className="PageTreeActionMenuButton__menu-item-delete"
        onSelect={this.handleClick(onClickDelete)}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    );

    const handleDesignNextPage = () => openInNewTab(WEBUI_DEV_WORKSPACE_URL);
    const handlePreviewNextPage = () => openInNewTab(`${WEBUI_APP_URL}/${this.props.locale}/${page.code}.page`);
    return (
      <div onClick={e => e.stopPropagation()} role="none" data-testid={`${page.code}-actions`}>
        <DropdownKebab pullRight id="WidgetListRow-dropown">
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-add"
            onSelect={this.handleClick(onClickAdd)}
          >
            <FormattedMessage id="app.add" />
          </MenuItem>
          {onClickEdit && (
            <MenuItem
              className="PageTreeActionMenuButton__menu-item-edit"
              onSelect={this.handleClick(onClickEdit)}
            >
              <FormattedMessage id="app.edit" />
            </MenuItem>
          )}
          {onClickConfigure && (
            <MenuItem
              className="PageTreeActionMenuButton__menu-item-configure"
              onSelect={page.type === NEXT_PAGE_TYPE ?
                handleDesignNextPage : this.handleClick(onClickConfigure)}
            >
              <FormattedMessage id="app.design" />
            </MenuItem>
          )}
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-clone"
            onSelect={this.handleClick(onClickClone)}
          >
            <FormattedMessage id="app.clone" />
          </MenuItem>
          { changePublishStatus }
          {onClickDetails && (
            <MenuItem
              className="PageTreeActionMenuButton__menu-item-details"
              onSelect={this.handleClick(onClickDetails)}
            >
              <FormattedMessage id="app.details" />
            </MenuItem>
          )}
          {renderDeleteItem()}
          {

            <MenuItem
              className="PageTreeActionMenuButton__menu-item-preview"
              onClick={page.type === NEXT_PAGE_TYPE ?
                handlePreviewNextPage : this.handleClickPreview(onClickPreview)}
            >
              <FormattedMessage id="app.preview" />
            </MenuItem>
          }
          {viewPublishedPage}
        </DropdownKebab>
      </div>
    );
  }
}

PageTreeActionMenu.propTypes = {
  page: PropTypes.shape({
    status: PropTypes.string.isRequired,
    isEmpty: PropTypes.bool,
    expanded: PropTypes.bool,
    hasPublishedChildren: PropTypes.bool,
    code: PropTypes.string,
    parentStatus: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onClickAdd: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickConfigure: PropTypes.func,
  onClickDetails: PropTypes.func,
  onClickClone: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickPublish: PropTypes.func,
  onClickUnpublish: PropTypes.func,
  onClickViewPublishedPage: PropTypes.func,
  onClickPreview: PropTypes.func,
  domain: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
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
  onClickViewPublishedPage: null,
  onClickPreview: null,
};

export default PageTreeActionMenu;
