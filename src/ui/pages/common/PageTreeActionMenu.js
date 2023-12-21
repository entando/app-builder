import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED, HOMEPAGE_CODE } from 'state/pages/const';

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

  renderPublishOrUnpublishMenuItem(disableDueToLackOfGroupAccess) {
    const {
      page, onClickPublish, onClickUnpublish, isSearchMode,
    } = this.props;
    const isUnpublishedPage = page.status === PAGE_STATUS_UNPUBLISHED;
    const hasUnpublishedParent = page.parentStatus === PAGE_STATUS_UNPUBLISHED;
    const isHomepage = page.code === HOMEPAGE_CODE;

    let disabled = false;
    if (!page.isEmpty && page.status === PAGE_STATUS_PUBLISHED && !isSearchMode) {
      disabled = true;
    }
    if (page.expanded) {
      disabled = page.hasPublishedChildren;
    }

    const disablePublishAction = (
      isUnpublishedPage && hasUnpublishedParent && !isSearchMode && !isHomepage
    ) || disableDueToLackOfGroupAccess;

    return page.status === PAGE_STATUS_PUBLISHED ?
      (
        <MenuItem
          disabled={disabled || disableDueToLackOfGroupAccess}
          className="PageTreeActionMenuButton__menu-item-unpublish"
          onSelect={!(disabled || disableDueToLackOfGroupAccess)
            ? this.handleClick(onClickUnpublish) : null}
        >
          <FormattedMessage id="app.unpublish" />
        </MenuItem >
      ) :
      (
        <MenuItem
          disabled={disablePublishAction}
          className="PageTreeActionMenuButton__menu-item-publish"
          onSelect={!disablePublishAction ? this.handleClick(onClickPublish) : null}
        >
          <FormattedMessage id="app.publish" />
        </MenuItem>
      );
  }

  renderViewPublishedPageMenuItem() {
    const { page, onClickViewPublishedPage } = this.props;
    return page.status === PAGE_STATUS_PUBLISHED ?
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
  }

  renderDeleteMenuItem(disableDueToLackOfGroupAccess) {
    const { page, onClickDelete } = this.props;
    const isPublished = page.status === PAGE_STATUS_PUBLISHED;
    const isHomepage = page.code === HOMEPAGE_CODE;
    const hasStatusDraft = page.status === PAGE_STATUS_DRAFT;

    const disableDelete = !page.isEmpty || isPublished || isHomepage ||
      hasStatusDraft || disableDueToLackOfGroupAccess;
    return (
      <MenuItem
        disabled={disableDelete}
        className="PageTreeActionMenuButton__menu-item-delete"
        onSelect={!disableDelete ? this.handleClick(onClickDelete) : null}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    );
  }

  render() {
    const {
      page, onClickAdd, onClickEdit, onClickConfigure, onClickDetails,
      onClickClone, onClickPreview, myGroupIds,
    } = this.props;
    const disableDueToLackOfGroupAccess = !myGroupIds.includes(page.ownerGroup);

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
              onSelect={!disableDueToLackOfGroupAccess ? this.handleClick(onClickEdit) : null}
              disabled={disableDueToLackOfGroupAccess}
            >
              <FormattedMessage id="app.edit" />
            </MenuItem>
          )}
          {onClickConfigure && (
            <MenuItem
              className="PageTreeActionMenuButton__menu-item-configure"
              onSelect={!disableDueToLackOfGroupAccess ? this.handleClick(onClickConfigure) : null}
              disabled={disableDueToLackOfGroupAccess}
            >
              <FormattedMessage id="app.design" />
            </MenuItem>
          )}
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-clone"
            onSelect={!disableDueToLackOfGroupAccess ? this.handleClick(onClickClone) : null}
            disabled={disableDueToLackOfGroupAccess}
          >
            <FormattedMessage id="app.clone" />
          </MenuItem>
          {this.renderPublishOrUnpublishMenuItem(disableDueToLackOfGroupAccess)}
          {onClickDetails && (
            <MenuItem
              className="PageTreeActionMenuButton__menu-item-details"
              onSelect={this.handleClick(onClickDetails)}
            >
              <FormattedMessage id="app.details" />
            </MenuItem>
          )}
          {this.renderDeleteMenuItem(disableDueToLackOfGroupAccess)}
          <MenuItem
            className="PageTreeActionMenuButton__menu-item-preview"
            onClick={this.handleClickPreview(onClickPreview)}
          >
            <FormattedMessage id="app.preview" />
          </MenuItem>
          {this.renderViewPublishedPageMenuItem()}
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
    ownerGroup: PropTypes.string,
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
  myGroupIds: PropTypes.arrayOf(PropTypes.string),
  isSearchMode: PropTypes.bool,
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
  myGroupIds: [],
  isSearchMode: false,
};

export default PageTreeActionMenu;
