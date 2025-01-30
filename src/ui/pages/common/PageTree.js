import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';
import { DDTable } from '@entando/ddtable';
import { DataTable } from '@entando/datatable';
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
import { HOMEPAGE_CODE, PAGE_MOVEMENT_OPTIONS } from 'state/pages/const';
import StatusBadge from './StatusBadge';


export const getIsRootAndVirtual = (page, virtualRootOn) => {
  if (!page) {
    return false;
  }
  if (page.code === HOMEPAGE_CODE && virtualRootOn) {
    return true;
  }
  return false;
};


class PageTree extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.renderActionCell = this.renderActionCell.bind(this);
    this.renderStatusCell = this.renderStatusCell.bind(this);
  }

  componentDidMount() {
    const { columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['title', 'status', 'displayedInMenu']);
    }
  }

  getColumnDefs() {
    const {
      columnOrder,
      onExpandAll,
      onCollapseAll,
      onExpandPage,
    } = this.props;

    const columnDefs = {
      title: {
        Header: (
          <div className="header-container">
            <FormattedMessage id="pageTree.pageTree" />
            <div
              onClick={onExpandAll}
              onKeyDown={onExpandAll}
              role="button"
              tabIndex={-1}
              className="PageTree"
            >
              <span className="icon fa fa-plus-square" />
              <FormattedMessage id="pageTree.expand" />
            </div>
            <div
              onClick={onCollapseAll}
              onKeyDown={onCollapseAll}
              role="button"
              tabIndex={-2}
              className="PageTree"
            >
              <span className="icon fa fa-minus-square" />
              <FormattedMessage id="pageTree.collapse" />
            </div>
          </div>
        ),
        attributes: {
          className: 'PageTree__thead-title',
          style: { width: '65%' },
        },
        Cell: ({ row: { original: page, index } }) => {
          const onClickExpand = () => {
            if (!page.isEmpty) {
              onExpandPage(page.code);
            }
          };
          return (
            <span role="button" tabIndex={index} className="PageTree__icons-label" onClick={onClickExpand} onKeyDown={onClickExpand}>
              <TreeNodeExpandedIcon expanded={page.expanded} />
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTree__page-name">{page.title}</span>
              <RowSpinner loading={!!page.loading} />
            </span>
          );
        },
        cellAttributes: ({ row: page }) => {
          const className = ['PageTree__tree-column-td', 'PageTree__container'];

          // Remove arrow from page with no child
          if (page.isEmpty || page.original.isEmpty) {
            className.push('PageTree__tree-column-td--empty');
          }
          // No drag class is added if first level child and Virtual Root On
          if (page.original.parentCode === page.original.code) {
            className.push('PageTree__no-drag');
          }

          return {
            className: className.join(' '),
            style: {
              marginLeft: (page.original.depth - 1) * 30 < 0 ? 0 : (page.original.depth - 1) * 30,
            },
          };
        },
      },
      status: {
        Header: <FormattedMessage id="pageTree.status" />,
        attributes: { className: 'PageTree__thead', style: { width: '15%' } },
        Cell: this.renderStatusCell,
        cellAttributes: { className: 'text-center', style: { verticalAlign: 'middle' } },
      },
      displayedInMenu: {
        Header: <FormattedMessage id="pageTree.displayedInMenu" />,
        attributes: { className: 'PageTree__thead', style: { width: '15%' } },
        Cell: ({ value }) => <FormattedMessage id={value ? 'app.yes' : 'app.no'} />,
        cellAttributes: { style: { fontSize: '14px', verticalAlign: 'middle' } },
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  static actionMapping = {
    [DDTable.DROP_MEDIUM]: PAGE_MOVEMENT_OPTIONS.INTO_PARENT,
    [DDTable.DROP_HIGH]: PAGE_MOVEMENT_OPTIONS.ABOVE_SIBLING,
    [DDTable.DROP_LOW]: PAGE_MOVEMENT_OPTIONS.BELOW_SIBLING,
  }

  handleDrop(dropType, sourcePage, targetPage) {
    const { onDropPage } = this.props;
    if (dropType) {
      onDropPage(sourcePage.code, targetPage.code, PageTree.actionMapping[dropType]);
    }
  }

  renderActionCell({ original: page }) {
    const isRootAndVirtual = getIsRootAndVirtual(page, this.props.virtualRootOn);

    if (isRootAndVirtual) {
      return null;
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
          myGroupIds={this.props.myGroupIds}
          isSearchMode={!!this.props.searchPages}
        />
      </div>
    );
  }

  renderStatusCell(args) {
    const isRootAndVirtual = getIsRootAndVirtual(args.row.original, this.props.virtualRootOn);
    if (isRootAndVirtual) return null;
    return (
      <StatusBadge status={args.value} hide={isRootAndVirtual} />
    );
  }

  render() {
    const {
      searchPages,
      pages,
      loading,
      onSetColumnOrder,
    } = this.props;

    const rowAction = {
      Header: <div />,
      attributes: { className: 'text-center', width: '5%' },
      Cell: this.renderActionCell,
      cellAttributes: { className: 'text-center', style: { verticalAlign: 'middle' } },
    };

    if (searchPages) return <PageListSearchTable rowAction={rowAction} {...this.props} />;
    const columns = this.getColumnDefs() || [];

    return (
      <Spinner loading={!!loading}>
        <div>
          <DataTable
            columns={columns}
            data={pages}
            rowAction={rowAction}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            classNames={{
              table: 'PageTree table-hover table-treegrid table-bordered',
              headerGroup: 'table-header',
              row: 'PageTree__row table-row',
              cell: 'table-cell',

            }}
            rowReordering={{
              onDrop: this.handleDrop,
              previewRender: PageTreePreview,
              dragHandleClassname: 'PageTree__drag-handle',
            }}
          />
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
  onSetColumnOrder: PropTypes.func,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  myGroupIds: PropTypes.arrayOf(PropTypes.string),
  virtualRootOn: PropTypes.bool,
  getIsVirtualRootOn: PropTypes.bool,
};

PageTree.defaultProps = {
  pages: [],
  searchPages: null,
  onDropPage: () => { },
  onExpandPage: () => { },
  onExpandAll: () => { },
  onCollapseAll: () => { },
  onSetColumnOrder: () => { },
  columnOrder: ['title', 'status', 'displayedInMenu'],
  myGroupIds: [],
  virtualRootOn: false,
  getIsVirtualRootOn: false,
};

export default PageTree;
