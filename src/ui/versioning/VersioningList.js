import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Spinner, PaginationRow, DropdownKebab } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter, formatDate } from '@entando/utils';
import { DataTable } from '@entando/datatable';
import { ROUTE_CMS_VERSIONING_CONTENT_HISTORY } from 'app-init/router';
import { getContentVersionStatusDetails } from 'ui/versioning/SingleContentVersioningHistoryItem';
import VersioningSearchForm from 'ui/versioning/VersioningSearchForm';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class VersioningList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['description', 'contentId', 'contentType', 'username', 'version', 'status']);
    }
    onDidMount();
  }

  getColumnDefs() {
    const { columnOrder, intl } = this.props;

    const columnDefs = {
      description: {
        Header: <FormattedMessage id="cms.versioning.list.description" defaultMessage="Description" />,
        attributes: {
          style: { width: '20%' },
        },
        cellAttributes: {
          className: 'SingleContentCurrentVersion__description',
        },
      },
      contentId: {
        Header: <FormattedMessage id="cms.versioning.list.id" defaultMessage="Id" />,
        attributes: {
          style: { width: '10%' },
          className: 'text-center',
        },
        cellAttributes: {
          className: 'text-center',
        },
        Cell: ({ value }) => <code>{value}</code>,
      },
      contentType: {
        Header: <FormattedMessage id="cms.versioning.list.contentType" defaultMessage="Content Type" />,
        attributes: {
          style: { width: '20%' },
          className: 'text-center',
        },
      },
      username: {
        Header: <FormattedMessage id="cms.versioning.list.editor" defaultMessage="Editor" />,
        attributes: {
          style: { width: '15%' },
          className: 'text-center',
        },
        cellAttributes: {
          className: 'text-center',
        },
      },
      version: {
        Header: <FormattedMessage id="cms.versioning.list.lastModify" defaultMessage="Last Modified" />,
        attributes: {
          style: { width: '15%' },
          className: 'text-center',
        },
        cellAttributes: {
          className: 'text-center',
        },
        Cell: ({ row: { original: values } }) => (
          <code>{values.version} ({formatDate(values.versionDate)})</code>
        ),
      },
      status: {
        Header: <FormattedMessage id="cms.versioning.list.status" defaultMessage="Status" />,
        attributes: {
          style: { width: '10%' },
          className: 'text-center',
        },
        cellAttributes: {
          className: 'text-center',
        },
        Cell: ({ row: { original: values } }) => {
          const { approved, onlineVersion } = values;
          const { color, title } = getContentVersionStatusDetails(approved, onlineVersion, intl);
          return (
            <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
          );
        },
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    const { fetchVersioningList, pageSize } = this.props;
    fetchVersioningList({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchVersioningList } = this.props;
    fetchVersioningList({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      versioningList,
      onSetColumnOrder,
      loading,
      page,
      pageSize,
      totalItems,
      lastPage,
      contentTypes,
      onSubmit,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const columns = this.getColumnDefs() || [];

    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * pageSize) + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);

    const rowAction = {
      Header: <FormattedMessage id="cms.versioning.list.actions" defaultMessage="Actions" />,
      cellAttributes: {
        className: 'text-center',
      },
      Cell: ({ values }) => (
        <DropdownKebab pullRight id={`VersioningListRow-dropdown-${values.id}`}>
          <LinkMenuItem
            id={`versioning-id${values.id}`}
            to={routeConverter(
              ROUTE_CMS_VERSIONING_CONTENT_HISTORY,
              { contentId: values.contentId },
            )}
            label={<FormattedMessage id="cms.label.details" defaultMessage="Details" />}
            className="VersioningListRow__menu-item-edit"
          />
        </DropdownKebab>
      ),
    };

    return (
      <div className="VersioningList__wrap">
        <Spinner loading={!!loading}>
          <VersioningSearchForm contentTypes={contentTypes} onSubmit={onSubmit} />
          <DataTable
            columns={columns}
            data={versioningList}
            rowAction={rowAction}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            classNames={{
              table: 'table-striped table-hover VersioningList__table',
              row: 'VersioningListRow',
              cell: 'VersioningListRow__td',
            }}
          />
          <PaginationRow
            itemCount={totalItems}
            itemsStart={itemsStart}
            itemsEnd={itemsEnd}
            viewType="table"
            pagination={pagination}
            amountOfPages={lastPage}
            pageInputValue={page}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            onFirstPage={() => this.changePage(1)}
            onPreviousPage={() => this.changePage(page - 1)}
            onPageInput={this.onPageInput}
            onNextPage={() => this.changePage(page + 1)}
            onLastPage={() => this.changePage(lastPage)}
            messages={messages}
          />
        </Spinner>
      </div>
    );
  }
}

VersioningList.propTypes = {
  intl: intlShape.isRequired,
  versioningList: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetchVersioningList: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

VersioningList.defaultProps = {
  loading: false,
  versioningList: [],
  contentTypes: [],
  onSetColumnOrder: () => {},
  columnOrder: [],
};

export default injectIntl(VersioningList);
