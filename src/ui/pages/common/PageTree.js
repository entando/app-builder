import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DDTable, gotoRoute } from 'frontend-common-components';

import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';
import PageTreePreview from 'ui/pages/common/PageTreePreview';
import PageTreeActionMenu from 'ui/pages/common/PageTreeActionMenu';
import { ROUTE_PAGE_ADD, ROUTE_PAGE_EDIT, ROUTE_PAGE_CONFIG } from 'app-init/router';

class PageTree extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(dropType, sourcePage, targetPage) {
    switch (dropType) {
      case DDTable.DROP_MEDIUM:
        this.props.onDropIntoPage(sourcePage.code, targetPage.code);
        break;
      case DDTable.DROP_HIGH:
        this.props.onDropAbovePage(sourcePage.code, targetPage.code);
        break;
      case DDTable.DROP_LOW:
        this.props.onDropBelowPage(sourcePage.code, targetPage.code);
        break;
      default: break;
    }
  }

  renderRows() {
    const { pages } = this.props;


    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          this.props.onExpandPage(page.code);
        }
      };
      const className = ['PageTree__tree-column-td'];
      if (page.isEmpty) {
        className.push('PageTree__tree-column-td--empty');
      }

      return (
        <DDTable.Tr key={page.code} rowData={page} className="PageTree__row">
          <td className={className.join(' ').trim()}>
            <DDTable.Handle>
              <button className="PageTree__drag-handle btn btn-primary">
                <i className="fa fa-arrows" />
              </button>
            </DDTable.Handle>
            <span
              role="button"
              tabIndex={i}
              className="PageTree__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTree__page-name">
                { page.title }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
          <td className="text-center">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="text-center">
            <FormattedMessage id={page.displayedInMenu ? 'app.yes' : 'app.no'} />
          </td>
          <td className="text-center">
            <PageTreeActionMenu
              page={page}
              onClickAdd={() => gotoRoute(ROUTE_PAGE_ADD)}
              onClickEdit={() => gotoRoute(ROUTE_PAGE_EDIT, { pageCode: page.code })}
              onClickConfigure={() => gotoRoute(ROUTE_PAGE_CONFIG, { pageCode: page.code })}
              onClickDetails={() => console.info(`clicked DETAILS on page ${page.code}`)}
              onClickClone={() => console.info(`clicked CLONE on page ${page.code}`)}
              onClickDelete={() => console.info(`clicked DELETE on page ${page.code}`)}
              onClickPublish={() => console.info(`clicked PUBLISH on page ${page.code}`)}
              onClickUnpublish={() => console.info(`clicked UNPUBLISH on page ${page.code}`)}
            />
          </td>
        </DDTable.Tr>
      );
    });
  }

  render() {
    return (
      <DDTable onDrop={this.handleDrop} PreviewRenderer={PageTreePreview}>
        <table className="PageTree table table-bordered table-hover table-treegrid">
          <thead>
            <tr>
              <th width="70%">
                <FormattedMessage id="pageTree.pageTree" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.status" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.displayedInMenu" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </DDTable>
    );
  }
}

PageTree.propTypes = {

  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    displayedInMenu: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),

  onDropIntoPage: PropTypes.func,
  onDropAbovePage: PropTypes.func,
  onDropBelowPage: PropTypes.func,
  onExpandPage: PropTypes.func,
};

PageTree.defaultProps = {
  pages: [],
  onDropIntoPage: () => {},
  onDropAbovePage: () => {},
  onDropBelowPage: () => {},
  onExpandPage: () => {},
};

export default PageTree;
