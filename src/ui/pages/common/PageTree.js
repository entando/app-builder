import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';
import { DDTable } from '@entando/ddtable';
import { DataTable } from '@entando/datatable';

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
import { PAGE_MOVEMENT_OPTIONS } from 'state/pages/const';
import { NEXT_PAGE_TEMPLATE_CODE } from 'ui/pages/common/const';


class PageTree extends Component {
  static actionMapping = {
    [DDTable.DROP_MEDIUM]: PAGE_MOVEMENT_OPTIONS.INTO_PARENT,
    [DDTable.DROP_HIGH]: PAGE_MOVEMENT_OPTIONS.ABOVE_SIBLING,
    [DDTable.DROP_LOW]: PAGE_MOVEMENT_OPTIONS.BELOW_SIBLING,
  }

  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.renderActionCell = this.renderActionCell.bind(this);
  }

  componentDidMount() {
    const { columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['title', 'pageModel', 'status', 'displayedInMenu']);
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
          <Fragment>
            <FormattedMessage id="pageTree.pageTree" />
            <div
              onClick={onExpandAll}
              onKeyDown={onExpandAll}
              role="button"
              tabIndex={-1}
              className="PageTree PageTree__toggler PageTree__toggler--expand"
            >
              <span className="icon fa fa-plus-square" />
              <FormattedMessage id="pageTree.expand" />
            </div>
            <div
              onClick={onCollapseAll}
              onKeyDown={onCollapseAll}
              role="button"
              tabIndex={-2}
              className="PageTree PageTree__toggler"
            >
              <span className="icon fa fa-minus-square" />
              <FormattedMessage id="pageTree.collapse" />
            </div>
          </Fragment>
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
            <span
              role="button"
              tabIndex={index}
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
          );
        },
        cellAttributes: ({ row: page }) => {
          const className = ['PageTree__tree-column-td'];
          if (page.isEmpty) {
            className.push('PageTree__tree-column-td--empty');
          }
          return { className: className.join(' ') };
        },
      },
      pageModel: {
        Header: <FormattedMessage id="pageTree.pageType" />,
        attributes: {
          className: 'text-center PageTree__thead',
          style: { width: '5%', verticalAlign: 'middle' },
        },
        Cell: ({ value }) => (
          <FormattedMessage id={`pageTree.${value !== NEXT_PAGE_TEMPLATE_CODE ? 'nt' : 'nx'}`} />
        ),
        cellAttributes: {
          className: 'text-center',
          style: { verticalAlign: 'middle' },
        },
      },
      status: {
        Header: <FormattedMessage id="pageTree.status" />,
        attributes: {
          className: 'text-center PageTree__thead',
          style: { width: '10%' },
        },
        Cell: ({ value }) => (
          <PageStatusIcon status={value} />
        ),
        cellAttributes: {
          className: 'text-center',
        },
      },
      displayedInMenu: {
        Header: <FormattedMessage id="pageTree.displayedInMenu" />,
        attributes: {
          className: 'text-center PageTree__thead',
          style: { width: '10%' },
        },
        Cell: ({ value }) => <FormattedMessage id={value ? 'app.yes' : 'app.no'} />,
        cellAttributes: {
          className: 'text-center',
          style: { verticalAlign: 'middle' },
        },
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }


  handleDrop(dropType, sourcePage, targetPage) {
    const { onDropPage } = this.props;
    if (dropType) {
      onDropPage(sourcePage.code, targetPage.code, PageTree.actionMapping[dropType]);
    }
  }

  renderActionCell({ original: page }) {
    return (
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
        showDeleteAction={page.pageModel !== NEXT_PAGE_TEMPLATE_CODE}
      />
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
      Header: <FormattedMessage id="pageTree.actions" />,
      attributes: {
        className: 'text-center',
        width: '10%',
      },
      Cell: this.renderActionCell,
      cellAttributes: {
        className: 'text-center',
      },
    };

    if (searchPages) {
      return <PageListSearchTable rowAction={rowAction} {...this.props} />;
    }

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
              table: 'PageTree table-hover table-treegrid',
              row: 'PageTree__row',
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
    pageModel: PropTypes.string.isRequired,
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
};

PageTree.defaultProps = {
  pages: [],
  searchPages: null,
  onDropPage: () => {},
  onExpandPage: () => {},
  onExpandAll: () => {},
  onCollapseAll: () => {},
  onSetColumnOrder: () => {},
  columnOrder: ['title', 'pageModel', 'status', 'displayedInMenu'],
};

export default PageTree;
