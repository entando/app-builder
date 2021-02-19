import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';
import { DDTable } from '@entando/ddtable';

import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';
import PageTreePreview from 'ui/pages/common/PageTreePreview';
import PageTreeActionMenu from 'ui/pages/common/PageTreeActionMenu';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';
import PublishPageModalContainer from 'ui/pages/common/PublishPageModalContainer';
import UnpublishPageModalContainer from 'ui/pages/common/UnpublishPageModalContainer';
import PageListSearchTable from 'ui/pages/list/PageListSearchTable';
import MovePageModalContainer from 'ui/pages/common/MovePageModalContainer';


class PageTree extends Component {
  static actionMapping = {
    [DDTable.DROP_MEDIUM]: MovePageModalContainer.INTO_PARENT,
    [DDTable.DROP_HIGH]: MovePageModalContainer.ABOVE_SIBLING,
    [DDTable.DROP_LOW]: MovePageModalContainer.BELOW_SIBLING,
  }

  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(dropType, sourcePage, targetPage) {
    const { onDropPage } = this.props;
    if (dropType) {
      onDropPage(sourcePage.code, targetPage.code, PageTree.actionMapping[dropType]);
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
          <td className={className.join(' ')}>
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
          <td className="text-center PageTree__displayed-in-menu">
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
              onClickViewPublishedPage={this.props.onClickViewPublishedPage}
              onClickPreview={this.props.onClickPreview}
              locale={this.props.locale}
              domain={this.props.domain}
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
      <Spinner loading={!!this.props.loading}>
        <div>
          <DDTable onDrop={this.handleDrop} PreviewRenderer={PageTreePreview}>
            <table className="PageTree table table-bordered table-hover table-treegrid">
              <thead>
                <tr>
                  <th width="70%">
                    <FormattedMessage id="pageTree.pageTree" />
                    <div
                      onClick={this.props.onExpandAll}
                      onKeyDown={this.props.onExpandAll}
                      role="button"
                      tabIndex={-1}
                      className="PageTree PageTree__toggler PageTree__toggler--expand"
                    >
                      <span className="icon fa fa-plus-square" />
                      <FormattedMessage id="pageTree.expand" />
                    </div>
                    <div
                      onClick={this.props.onCollapseAll}
                      onKeyDown={this.props.onCollapseAll}
                      role="button"
                      tabIndex={-2}
                      className="PageTree PageTree__toggler"
                    >
                      <span className="icon fa fa-minus-square" />
                      <FormattedMessage id="pageTree.collapse" />
                    </div>
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
          <PublishPageModalContainer />
          <UnpublishPageModalContainer />
          <MovePageModalContainer />
        </div>
      </Spinner>
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
  onClickViewPublishedPage: PropTypes.func.isRequired,
  onClickPreview: PropTypes.func.isRequired,
  onDropPage: PropTypes.func,
  onExpandPage: PropTypes.func,
  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  domain: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

PageTree.defaultProps = {
  pages: [],
  searchPages: null,
  onDropPage: () => {},
  onExpandPage: () => {},
  onExpandAll: () => {},
  onCollapseAll: () => {},
};

export default PageTree;
