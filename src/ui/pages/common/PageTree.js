import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DDTable } from 'frontend-common-components';

import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';
import PageTreePreview from 'ui/pages/common/PageTreePreview';
import PageTreeActionMenu from 'ui/pages/common/PageTreeActionMenu';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';
import PageListSearchTable from 'ui/pages/list/PageListSearchTable';

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
            <PageStatusIcon status={page.status} title={page.title} />
          </td>
          <td className="text-center">
            <FormattedMessage id={page.displayedInMenu ? 'app.yes' : 'app.no'} />
          </td>
          <td className="text-center">
            <PageTreeActionMenu
              page={page}
              onClickAdd={this.props.onClickAdd}
              onClickEdit={this.props.onClickEdit}
              onClickConfigure={this.props.onClickConfigure}
              onClickDetails={this.props.onClickDetails}
              onClickClone={this.props.onClickClone}
              onClickDelete={this.props.onClickDelete}
              onClickPublish={this.props.onClickPublish}
              onClickUnpublish={this.props.onClickUnPublish}
            />
          </td>
        </DDTable.Tr>
      );
    });
  }

  render() {
    if (this.props.searchPages) {
      return <PageListSearchTable {...this.props} />;
    }
    return (
      <div>
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
        <DeletePageModalContainer />
      </div>
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
  searchPages: PropTypes.arrayOf(PropTypes.shape({

  })),
  onClickAdd: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickConfigure: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickDetails: PropTypes.func.isRequired,
  onClickClone: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
  onClickUnPublish: PropTypes.func.isRequired,
  onDropIntoPage: PropTypes.func,
  onDropAbovePage: PropTypes.func,
  onDropBelowPage: PropTypes.func,
  onExpandPage: PropTypes.func,
};

PageTree.defaultProps = {
  pages: [],
  searchPages: null,
  onDropIntoPage: () => {},
  onDropAbovePage: () => {},
  onDropBelowPage: () => {},
  onExpandPage: () => {},
};

export default PageTree;
