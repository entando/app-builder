import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  Spinner,
  DropdownKebab,
  MenuItem,
  PaginationRow,
} from 'patternfly-react';
import { DataTable } from '@entando/datatable';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_CONTENTTEMPLATE_EDIT } from 'app-init/router';

import DeleteContentTemplateModalContainer from 'ui/content-template/DeleteContentTemplateModalContainer';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class ContentTemplateList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['id', 'contentType', 'descr']);
    }
    onDidMount();
  }

  getColumnDefs() {
    const { columnOrder } = this.props;

    const columnDefs = {
      id: {
        Header: <FormattedMessage id="cms.contenttemplate.list.contentTypeIdHeader" />,
        attributes: {
          style: { width: '10%' },
        },
      },
      contentType: {
        Header: <FormattedMessage id="cms.contenttemplate.list.contentTypeHeader" />,
        attributes: {
          style: { width: '20%' },
        },
      },
      descr: {
        Header: <FormattedMessage id="cms.contenttemplate.list.contentTemplateNameHeader" />,
        attributes: {
          style: { width: '60%' },
        },
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    const { fetchList, pageSize } = this.props;
    fetchList({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchList } = this.props;
    fetchList({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      contentTemplates,
      loading,
      onClickDelete,
      onSetColumnOrder,
      page,
      pageSize,
      totalItems,
      lastPage,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const columns = this.getColumnDefs() || [];

    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * pageSize) + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);

    const rowAction = {
      Header: <FormattedMessage id="cms.contenttemplate.list.actionsHeader" />,
      cellAttributes: {
        className: 'text-center',
      },
      Cell: ({ values: item }) => (
        <DropdownKebab pullRight id={`ContentTemplateList-dropdown-${item.id}`}>
          <LinkMenuItem
            id={`contmodel-id${item.id}`}
            to={routeConverter(ROUTE_CMS_CONTENTTEMPLATE_EDIT, { id: item.id })}
            label={<FormattedMessage id="cms.label.edit" defaultMessage="Edit" />}
            className="ContentTemplateList__menu-item-edit"
          />
          <MenuItem className="ContentTemplateList__menu-item-delete" onClick={() => onClickDelete(item)}>
            <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
          </MenuItem>
        </DropdownKebab>
      ),
    };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="ContentTemplateList__wrap">
        <Spinner loading={!!loading}>
          <DataTable
            columns={columns}
            data={contentTemplates}
            rowAction={rowAction}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            classNames={{
              table: 'table-striped table-hover ContentTemplateList__table',
              row: 'ContentTemplateList',
              cell: 'ContentTemplateList__td',
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
          <DeleteContentTemplateModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentTemplateList.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

ContentTemplateList.defaultProps = {
  loading: false,
  onSetColumnOrder: () => {},
  columnOrder: [],
};

export default injectIntl(ContentTemplateList);
