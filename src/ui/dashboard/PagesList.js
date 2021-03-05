import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Paginator } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { DataTable } from '@entando/datatable';

import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { formatDate } from '@entando/utils';
import paginatorMessages from 'ui/paginatorMessages';

class PagesList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onWillMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['fullTitles', 'pageModel', 'numWidget', 'status', 'lastModified']);
    }
    onWillMount();
  }

  getColumnDefs() {
    const { columnOrder, language } = this.props;

    const columnDefs = {
      fullTitles: {
        Header: <FormattedMessage id="app.name" />,
        attributes: {
          style: { width: '32%' },
        },
        Cell: (cellInfo) => {
          const { row: { original: page } } = cellInfo;
          return (
            <EllipsisWithTooltip style={{ maxWidth: 208 }} placement="bottom">
              {page.fullTitles[language]}
            </EllipsisWithTooltip>
          );
        },
      },
      pageModel: {
        Header: <FormattedMessage id="pages.pageForm.pageTemplate" />,
        attributes: {
          style: { width: '20%' },
        },
        Cell: (cellInfo) => {
          const { row: { original: page } } = cellInfo;
          return (
            <EllipsisWithTooltip style={{ maxWidth: 120 }} placement="bottom">
              {page.pageModel}
            </EllipsisWithTooltip>
          );
        },
      },
      numWidget: {
        Header: <FormattedMessage id="dashboard.numberWidgets" />,
        Cell: ({ value }) => `${value} widget(s)`,
      },
      status: {
        Header: <FormattedMessage id="pageTree.status" />,
        attributes: {
          className: 'text-center',
          style: { width: '10%' },
        },
        Cell: (cellInfo) => {
          const { row: { original: page } } = cellInfo;
          return (
            <PageStatusIcon status={page.status} />
          );
        },
        cellAttributes: {
          className: 'text-center',
        },
      },
      lastModified: {
        Header: <FormattedMessage id="app.lastModified" />,
        attributes: {
          style: { width: '19%' },
        },
        Cell: ({ value }) => formatDate(value),
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    this.props.onWillMount(page);
  }

  changePageSize(pageSize) {
    this.props.onWillMount(1, pageSize);
  }

  render() {
    const {
      pages,
      onSetColumnOrder,
      page,
      pageSize: perPage,
    } = this.props;
    const pagination = {
      page,
      perPage,
      perPageOptions: [5, 10, 15],
    };

    const { intl } = this.props;

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const columns = this.getColumnDefs() || [];

    return (
      <div className="PagesList">
        <h2>
          <FormattedMessage id="app.pages" />
          <Button
            bsStyle="primary"
            className="pull-right"
            componentClass={Link}
            to={ROUTE_PAGE_ADD}
          >
            <FormattedMessage id="app.add" defaultMessage="Add" />
          </Button>
        </h2>
        <div className="PagesList__wrapper">
          <DataTable
            columns={columns}
            data={pages}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            classNames={{
              table: 'PageTemplateListTable__table table-striped',
              cell: 'FragmentListRow__td',
            }}
          />
        </div>
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={this.props.totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
          messages={messages}
        />
        <Clearfix />
      </div>
    );
  }
}

PagesList.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    fullTitles: PropTypes.shape({
      en: PropTypes.string,
      it: PropTypes.string,
    }),
    status: PropTypes.string,
    numWidget: PropTypes.number,
    lastModified: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

PagesList.defaultProps = {
  pages: [],
  columnOrder: ['fullTitles', 'pageModel', 'numWidget', 'status', 'lastModified'],
  onSetColumnOrder: () => {},
};

export default injectIntl(PagesList);
