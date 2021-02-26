import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, Spinner, Alert } from 'patternfly-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { DataTable } from '@entando/datatable';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';
import paginatorMessages from 'ui/paginatorMessages';

class PageListSearchTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onWillMount, pageSearchColumnOrder, onSetColumnOrderPageSearch } = this.props;
    if (!pageSearchColumnOrder.length) {
      onSetColumnOrderPageSearch(['code', 'titles']);
    }
    onWillMount();
  }

  getColumnDefs() {
    const { pageSearchColumnOrder, locale } = this.props;

    const columnDefs = {
      code: {
        Header: <FormattedMessage id="app.code" />,
        attributes: {
          style: { width: '20%' },
        },
      },
      titles: {
        Header: <FormattedMessage id="app.title" />,
        Cell: ({ value }) => value[locale],
      },
    };

    return pageSearchColumnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    this.props.onSearchPageChange({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onSearchPageChange({ page: 1, pageSize });
  }

  renderTable() {
    const {
      searchPages,
      page,
      pageSize,
      intl,
      striped,
      selectedPage,
      rowAction,
      onRowClick,
      onSetColumnOrderPageSearch,
    } = this.props;

    if (searchPages.length === 0) {
      return (
        <Alert type="warning">
          <strong><FormattedMessage id="pages.noPageFound" /></strong>
        </Alert>
      );
    }

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    const columns = this.getColumnDefs() || [];

    const getRowAttributes = row => ({
      onClick: onRowClick(row),
      className: selectedPage && selectedPage.code === row.code ? 'selected' : '',
    });

    return (
      <div>
        <DataTable
          columns={columns}
          data={searchPages}
          rowAction={rowAction}
          columnResizable
          onColumnReorder={onSetColumnOrderPageSearch}
          rowAttributes={getRowAttributes}
          classNames={{
            table: `PageListSearchTable__table ${striped ? 'table-striped' : ''}`,
            row: 'PageListSearchTable__row',
            cell: 'PageListSearchRow__td',
          }}
        />
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={this.props.totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
          messages={messages}
        />
      </div>
    );
  }

  render() {
    const { className, loading } = this.props;
    return (
      <div className={`PageListSearchTable ${className}`}>
        <Spinner loading={!!loading}>
          {this.renderTable()}
        </Spinner>
        <DeletePageModalContainer />
      </div>
    );
  }
}

PageListSearchTable.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  locale: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  searchPages: PropTypes.arrayOf(PropTypes.shape({})),
  selectedPage: PropTypes.shape({}),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  className: PropTypes.string,
  striped: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSearchPageChange: PropTypes.func.isRequired,
  pageSearchColumnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrderPageSearch: PropTypes.func,
  rowAction: PropTypes.shape({}),
};

PageListSearchTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  searchPages: [],
  selectedPage: {},
  className: '',
  striped: true,
  onRowClick: () => {},
  onSetColumnOrderPageSearch: () => {},
  pageSearchColumnOrder: ['code', 'titles'],
  rowAction: null,
};

export default injectIntl(PageListSearchTable);
