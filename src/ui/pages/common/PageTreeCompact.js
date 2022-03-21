import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';
import { PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';

class PageTreeCompact extends Component {
  renderRows() {
    const {
      pages, onClickDetails, onClickAdd, onClickEdit, onClickConfigure,
      onClickClone, onClickDelete, onClickUnPublish, onClickPublish,
      onRowClick, onClickViewPublishedPage, onClickPreview, selectedPage,
      domain, locale, loadOnPageSelect, myGroupIds,
    } = this.props;

    const handleClick = (handler, page) => (e) => {
      e.stopPropagation();
      return handler && handler(page);
    };
    const handleClickViewPublishedPage = (handler, page) =>
      () => handler && handler(page, domain, locale);
    const handleClickPreview = (handler, page) =>
      () => handler && handler(page, domain);
    return pages.map((page, i) => {
      const disableDueToLackOfGroupAccess = !myGroupIds.includes(page.ownerGroup);
      const onClickExpand = () => {
        if (!page.isEmpty) {
          this.props.onExpandPage(page.code);
        }
      };
      const className = ['PageTreeCompact__tree-column-td'];
      if (page.isEmpty) {
        className.push('PageTreeCompact__tree-column-td--empty');
      }

      let disabled = false;
      if (!page.isEmpty && page.status === PAGE_STATUS_PUBLISHED) {
        disabled = true;
      }
      if (page.expanded) {
        disabled = page.hasPublishedChildren;
      }
      const publishedDisabled = (page.status === PAGE_STATUS_UNPUBLISHED
        && page.parentStatus === PAGE_STATUS_UNPUBLISHED) || disableDueToLackOfGroupAccess;
      const changePublishStatus = page.status === PAGE_STATUS_PUBLISHED ?
        (
          <MenuItem
            disabled={disabled || disableDueToLackOfGroupAccess}
            className="PageTreeActionMenuButton__menu-item-unpublish"
            onClick={!(disabled || disableDueToLackOfGroupAccess) ?
              handleClick(onClickUnPublish, page) : null}
          >
            <FormattedMessage id="app.unpublish" />
          </MenuItem>
        ) :
        (
          <MenuItem
            disabled={publishedDisabled}
            className="PageTreeActionMenuButton__menu-item-publish"
            onClick={!publishedDisabled ? handleClick(onClickPublish, page) : null}
          >
            <FormattedMessage id="app.publish" />
          </MenuItem>
        );
      const viewPublishedPage = page.status === PAGE_STATUS_PUBLISHED ?
        (
          <MenuItem
            disabled={false}
            className="PageTreeActionMenuButton__menu-item-preview"
            onClick={handleClickViewPublishedPage(onClickViewPublishedPage, page)}
          >
            <FormattedMessage id="pageTree.viewPublishedPage" />
          </MenuItem>
        ) :
        (
          <MenuItem
            disabled
            className="PageTreeActionMenuButton__menu-item-preview"
          >
            <FormattedMessage id="pageTree.viewPublishedPage" />
          </MenuItem>
        );
      const deletionDisabled = !page.isEmpty || page.status === PAGE_STATUS_PUBLISHED ||
        page.status === PAGE_STATUS_DRAFT || disableDueToLackOfGroupAccess;
      const renderDeleteItem = () => (
        <MenuItem
          disabled={deletionDisabled}
          className="PageTreeActionMenuButton__menu-item-delete"
          onClick={!deletionDisabled ? handleClick(onClickDelete, page) : undefined}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      );

      return (
        <tr
          key={page.code}
          className={`PageTreeCompact__row ${selectedPage && selectedPage.code === page.code ? 'PageTreeCompact__row--selected' : ''}`}
          onClick={() => onRowClick(page)}
        >
          <td className={className.join(' ').trim()}>
            <div className="PageTreeCompact__column-wrapper">
              <span
                role="button"
                tabIndex={i}
                className="PageTreeCompact__icons-label"
                style={{ marginLeft: page.depth * 16 }}
                onClick={(e) => {
                  if (loadOnPageSelect && !page.isEmpty) e.stopPropagation();
                  onClickExpand();
                }}
                onKeyDown={onClickExpand}
              >
                <TreeNodeExpandedIcon expanded={page.expanded} />
                {!loadOnPageSelect && (
                  <span className="PageTreeCompact__page-name">
                    {page.title}
                  </span>
                )}
                <RowSpinner loading={!!page.loading} />
              </span>
              {loadOnPageSelect && (
                <span className="PageTreeCompact__page-name">
                  {page.title}
                </span>
              )}
            </div>
          </td>
          <td className="text-center PageTreeCompact__status-col">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="text-center PageTreeCompact__actions-col">
            <div onClick={e => e.stopPropagation()} role="none">
              <DropdownKebab className="PageTreeCompact__kebab-button" key={page.code} id={page.code} pullRight>
                <MenuItem onClick={handleClick(onClickAdd, page)}>
                  <FormattedMessage id="pageTree.add" />
                </MenuItem>
                {onClickEdit && (
                  <MenuItem
                    onClick={!disableDueToLackOfGroupAccess ? handleClick(onClickEdit, page) : null}
                    disabled={disableDueToLackOfGroupAccess}
                  >
                    <FormattedMessage id="app.edit" />
                  </MenuItem>
                )}
                {onClickConfigure && (
                  <MenuItem
                    onClick={!disableDueToLackOfGroupAccess ?
                      handleClick(onClickConfigure, page) : null}
                    disabled={disableDueToLackOfGroupAccess}
                  >
                    <FormattedMessage id="app.design" />
                  </MenuItem>
                )}
                {onClickDetails && (
                  <MenuItem onClick={handleClick(onClickDetails, page)}>
                    <FormattedMessage id="app.details" />
                  </MenuItem>
                )}
                <MenuItem
                  onClick={!disableDueToLackOfGroupAccess ? handleClick(onClickClone, page) : null}
                  disabled={disableDueToLackOfGroupAccess}
                >
                  <FormattedMessage id="app.clone" />
                </MenuItem>
                {renderDeleteItem()}
                {changePublishStatus}
                <MenuItem onClick={handleClickPreview(onClickPreview, page)}>
                  <FormattedMessage id="app.preview" />
                </MenuItem>
                {viewPublishedPage}
              </DropdownKebab>
            </div>
          </td>
        </tr >
      );
    });
  }

  render() {
    const { className } = this.props;

    return (
      <table className={`PageTreeCompact table table-hover ${className}`}>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

PageTreeCompact.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),
  selectedPage: PropTypes.shape({
    code: PropTypes.string,
  }),
  onExpandPage: PropTypes.func,
  onClickClone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickUnPublish: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func,
  onClickConfigure: PropTypes.func,
  onClickDetails: PropTypes.func,
  onRowClick: PropTypes.func,
  onClickViewPublishedPage: PropTypes.func.isRequired,
  onClickPreview: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  loadOnPageSelect: PropTypes.bool,
  className: PropTypes.string,
  myGroupIds: PropTypes.arrayOf(PropTypes.string),
};

PageTreeCompact.defaultProps = {
  pages: [],
  selectedPage: {},
  loadOnPageSelect: false,
  onExpandPage: () => {},
  onClickEdit: null,
  onClickConfigure: null,
  onClickDetails: null,
  onRowClick: () => {},
  className: '',
  myGroupIds: [],
};

export default PageTreeCompact;
