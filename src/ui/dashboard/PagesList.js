import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { DataTable } from '@entando/datatable';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { formatDate, hasAccess } from '@entando/utils';
import paginatorMessages from 'ui/paginatorMessages';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';
import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';
import Icon from 'ui/common/icon/Icon';
import Button from 'ui/common/Button';
import StatusBadge from 'ui/pages/common/StatusBadge';

class PagesList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const {
      onWillMount, columnOrder, onSetColumnOrder, userPermissions,
    } =
      this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['pageModel', 'numWidget', 'status', 'lastModified']);
    }
    if (hasAccess(MANAGE_PAGES_PERMISSION, userPermissions)) {
      onWillMount();
    }
  }

  getColumnDefs() {
    const { columnOrder } = this.props;

    const columnDefs = {
      pageModel: {
        Header: <FormattedMessage id="pages.pageForm.pageTemplate" />,
        attributes: {
          style: { width: '25%' },
        },
        Cell: (cellInfo) => {
          const {
            row: { original: page },
          } = cellInfo;
          return (
            <EllipsisWithTooltip style={{ maxWidth: 120 }} placement="bottom">
              {page.pageModel}
            </EllipsisWithTooltip>
          );
        },
      },
      numWidget: {
        Header: <FormattedMessage id="dashboard.numberWidgets" />,
        Cell: ({ value }) => `${value} widget${value > 1 ? 's' : ''}`,
        attributes: {
          style: { width: '25%' },
        },
      },
      status: {
        Header: <FormattedMessage id="pageTree.status" />,
        attributes: {
          style: { width: '25%' },
        },
        Cell: (cellInfo) => {
          const {
            row: { original: page },
          } = cellInfo;
          return <StatusBadge status={page.status} />;
        },
        cellAttributes: {
          className: 'text-center',
        },
      },
      lastModified: {
        Header: <FormattedMessage id="app.lastModified" />,
        attributes: {
          style: { width: '25%' },
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
    const { pageSize } = this.props;
    this.props.onWillMount(page, pageSize);
  }

  changePageSize(pageSize) {
    this.props.onWillMount(1, pageSize);
  }

  render() {
    const {
      pages, onSetColumnOrder, page, pageSize: perPage,
    } = this.props;
    const pagination = { page, perPage, perPageOptions: [5, 10, 15] };
    const { intl } = this.props;

    const messages = Object.keys(paginatorMessages).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: intl.formatMessage(paginatorMessages[curr]),
      }),
      {},
    );

    const columns = this.getColumnDefs() || [];

    return (
      <div className="PagesList">
        <ViewPermissionNoticeOverlay viewPermissions={MANAGE_PAGES_PERMISSION}>
          <h2 className="card-pf-title">
            <div className="left-title">
              <Icon name="pages" type="lucide" background className="primary" />
              <FormattedMessage id="app.pages" />
            </div>
            <Button
              bsStyle="link"
              className="primary pull-right"
              componentClass={Link}
              to={ROUTE_PAGE_ADD}
            >
              <Icon name="plus" type="lucide" className="primary" />
              <FormattedMessage id="app.add" defaultMessage="Add" />
            </Button>
          </h2>
          <div className="PagesList__wrapper">
            <DataTable
              columns={columns}
              data={pages || []}
              columnResizable
              onColumnReorder={onSetColumnOrder}
              classNames={{
                table: 'PageTemplateListTable__table table-bordered',
                headerGroup: 'table-header',
                row: 'table-row',
                cell: 'table-cell',
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
        </ViewPermissionNoticeOverlay>
      </div>
    );
  }
}

PagesList.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    status: PropTypes.string,
    numWidget: PropTypes.number,
    lastModified: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

PagesList.defaultProps = {
  pages: [],
  userPermissions: [],
  columnOrder: ['pageModel', 'numWidget', 'status', 'lastModified'],
  onSetColumnOrder: () => { },
};

export default injectIntl(PagesList);
