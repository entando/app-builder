import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';
import { PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';

class PageTreeCompact extends Component {
  renderRows() {
    const {
      pages, onClickDetails, onClickAdd, onClickEdit, onClickConfigure,
      onClickClone, onClickDelete, onClickUnPublish, onClickPublish,
      onClickViewPublishedPage, onClickPreview, domain, locale,
    } = this.props;
    const handleClick = (handler, page) => () => handler && handler(page);
    const handleClickViewPublishedPage = (handler, page) =>
      () => handler && handler(page, domain, locale);
    const handleClickPreview = (handler, page) =>
      () => handler && handler(page, domain);
    return pages.map((page, i) => {
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
      const changePublishStatus = page.status === PAGE_STATUS_PUBLISHED ?
        (
          <MenuItem
            disabled={disabled}
            className="PageTreeActionMenuButton__menu-item-unpublish"
            onSelect={handleClick(onClickUnPublish, page)}
          >
            <FormattedMessage id="app.unpublish" />
          </MenuItem>
        ) :
        (
          <MenuItem
            disabled={
              page.status === PAGE_STATUS_UNPUBLISHED
              && page.parentStatus === PAGE_STATUS_UNPUBLISHED
            }
            className="PageTreeActionMenuButton__menu-item-publish"
            onSelect={handleClick(onClickPublish, page)}
          >
            <FormattedMessage id="app.publish" />
          </MenuItem>
        );
      const viewPublishedPage = page.status !== PAGE_STATUS_UNPUBLISHED ?
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
      const renderDeleteItem = () => {
        if (page.status === PAGE_STATUS_PUBLISHED) {
          return null;
        }

        return (
          <MenuItem
            disabled={!page.isEmpty}
            className="PageTreeActionMenuButton__menu-item-delete"
            onSelect={handleClick(onClickDelete, page)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        );
      };

      return (
        <tr key={page.code} className="PageTreeCompact__row">
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="PageTreeCompact__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
              <span className="PageTreeCompact__page-name">
                { page.title }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
          <td className="text-center PageTreeCompact__status-col">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="text-center PageTreeCompact__actions-col">
            <DropdownKebab className="PageTreeCompact__kebab-button" key={page.code} id={page.code} pullRight>
              <MenuItem onClick={handleClick(onClickAdd, page)}>
                <FormattedMessage id="app.add" />
              </MenuItem>
              <MenuItem onClick={handleClick(onClickEdit, page)}>
                <FormattedMessage id="app.edit" />
              </MenuItem>
              <MenuItem onClick={handleClick(onClickConfigure, page)}>
                <FormattedMessage id="app.design" />
              </MenuItem>
              <MenuItem onClick={handleClick(onClickDetails, page)} >
                <FormattedMessage id="app.details" />
              </MenuItem>
              <MenuItem onClick={handleClick(onClickClone, page)}>
                <FormattedMessage id="app.clone" />
              </MenuItem>
              {renderDeleteItem()}
              {changePublishStatus}
              <MenuItem onClick={handleClickPreview(onClickPreview, page)}>
                <FormattedMessage id="app.preview" />
              </MenuItem>
              {viewPublishedPage}
            </DropdownKebab>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="PageTreeCompact table table-hover">
        <tbody>
          { this.renderRows() }
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
  onExpandPage: PropTypes.func,
  onClickClone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickDetails: PropTypes.func.isRequired,
  onClickUnPublish: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickConfigure: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
  onClickViewPublishedPage: PropTypes.func.isRequired,
  onClickPreview: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

PageTreeCompact.defaultProps = {
  pages: [],
  onExpandPage: () => {},
};

export default PageTreeCompact;
