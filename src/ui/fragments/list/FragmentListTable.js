import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Spinner } from 'patternfly-react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { DataTable } from '@entando/datatable';

import FragmentListMenuActions from 'ui/fragments/list/FragmentListMenuActions';
import DeleteFragmentModalContainer from 'ui/fragments/list/DeleteFragmentModalContainer';
import paginatorMessages from 'ui/paginatorMessages';

class FragmentListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    const { onWillMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['code', 'widgetType', 'pluginCode']);
    }
    onWillMount();
  }

  getColumnDefs() {
    const { columnOrder } = this.props;

    const columnDefs = {
      code: {
        Header: <FormattedMessage id="app.code" />,
      },
      widgetType: {
        Header: <FormattedMessage id="fragment.table.widgetType" />,
        attributes: {
          className: 'text-center',
          style: { width: '10%' },
        },
        Cell: ({ row: { original: fragment } }) => (
          fragment.widgetType ? fragment.widgetType.title : ''
        ),
      },
      pluginCode: {
        Header: <FormattedMessage id="fragment.table.plugin" />,
        attributes: {
          className: 'text-center',
          style: { width: '10%' },
        },
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    const { filters } = this.props;
    this.props.onWillMount({ page, pageSize: this.props.pageSize }, filters);
  }

  changePageSize(pageSize) {
    const { filters } = this.props;
    this.props.onWillMount({ page: 1, pageSize }, filters);
  }

  renderTable() {
    const {
      page,
      pageSize,
      intl,
      fragments,
      onSetColumnOrder,
    } = this.props;
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50, 100, 150],
    };

    const columns = this.getColumnDefs() || [];

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const rowAction = {
      Header: <FormattedMessage id="app.actions" />,
      attributes: {
        className: 'text-center',
        style: { width: '10%' },
      },
      cellAttributes: {
        className: 'text-center',
      },
      Cell: ({ values }) => (
        <FragmentListMenuActions code={values.code} {...this.props} />
      ),
    };

    return (
      <Col xs={12}>
        <DataTable
          columns={columns}
          data={fragments}
          rowAction={rowAction}
          columnResizable
          onColumnReorder={onSetColumnOrder}
          classNames={{
            table: 'FragmentListTable__table table-striped',
            cell: 'FragmentListRow__td',
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
      </Col>);
  }

  render() {
    return (
      <div className="FragmentListTable">
        <Spinner loading={!!this.props.loading} >
          {this.renderTable()}
        </Spinner>
        <DeleteFragmentModalContainer />
      </div>
    );
  }
}

FragmentListTable.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  fragments: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
    widgetType: PropTypes.shape({
      code: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    pluginCode: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  filters: PropTypes.string,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

FragmentListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  fragments: [],
  filters: '',
  onSetColumnOrder: () => {},
  columnOrder: [],
};

export default injectIntl(FragmentListTable);
