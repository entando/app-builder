import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  Spinner,
  Paginator,
  DropdownKebab,
  MenuItem,
} from 'patternfly-react';
import { DataTable } from '@entando/datatable';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { ROUTE_CMS_CONTENTTYPE_EDIT } from 'app-init/router';
import ContentTypeStatusIcon from 'ui/content-type/ContentTypeStatusIcon';
import ContentTypeReferenceStatusContainer from 'ui/content-type/ContentTypeReferenceStatusContainer';
import DeleteContentTypeModalContainer from 'ui/content-type/DeleteContentTypeModalContainer';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class ContentTypeList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['name', 'code', 'status']);
    }
    onDidMount();
  }

  getColumnDefs() {
    const { columnOrder, intl } = this.props;

    const columnDefs = {
      name: {
        Header: <FormattedMessage id="cms.contenttype.list.contentTypeNameHeader" />,
      },
      code: {
        Header: <FormattedMessage id="cms.contenttype.list.contentTypeCodeHeader" />,
        attributes: {
          style: { width: '10%' },
        },
      },
      status: {
        Header: <FormattedMessage id="cms.contenttype.list.contentTypeStatusHeader" />,
        attributes: {
          style: { width: '10%' },
        },
        Cell: ({ row: { original: { status } } }) => (
          <ContentTypeStatusIcon
            status={status}
            title={intl.formatMessage({ id: `cms.contenttype.list.status.${status}` })}
          />
        ),
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    const { onDidMount, pageSize } = this.props;
    onDidMount({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { onDidMount } = this.props;
    onDidMount({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      contentTypes,
      loading,
      onClickDelete,
      onSetColumnOrder,
      onClickReload,
      page,
      pageSize,
      totalItems,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const columns = this.getColumnDefs() || [];

    const rowAction = {
      Header: <FormattedMessage id="cms.contenttype.list.actionsHeader" />,
      cellAttributes: {
        className: 'text-center',
      },
      Cell: ({ values: { code, name } }) => {
        const onDelete = () => onClickDelete({ name, code });
        const onReload = () => onClickReload(code);
        return (
          <div data-testid={`${code}-actions`}>
            <DropdownKebab pullRight id={`ContentTypeList-dropdown-${code}`}>
              <LinkMenuItem
                id={`conttype-id${code}`}
                to={routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code })}
                label={<FormattedMessage id="cms.label.edit" defaultMessage="Edit" />}
                className="ContentTypeList__menu-item-edit"
              />
              <MenuItem className="ContentTypeList__menu-item-reload" onClick={onReload}>
                <FormattedMessage id="cms.label.reload" defaultMessage="Refresh" />
              </MenuItem>
              <MenuItem className="ContentTypeList__menu-item-delete" onClick={onDelete}>
                <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
              </MenuItem>
            </DropdownKebab>
          </div>
        );
      },
    };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="ContentTypeList__wrap">
        <Spinner loading={!!loading}>
          <ContentTypeReferenceStatusContainer />
          <DataTable
            columns={columns}
            data={contentTypes}
            rowAction={rowAction}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            classNames={{
              table: 'table-striped table-hover ContentTypeList__table',
              row: 'ContentTypeList',
              cell: 'ContentTypeList__td',
            }}
          />
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            messages={messages}
          />
          <DeleteContentTypeModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentTypeList.propTypes = {
  intl: intlShape.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickReload: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

ContentTypeList.defaultProps = {
  loading: false,
  onSetColumnOrder: () => {},
  columnOrder: [],
};

export default injectIntl(ContentTypeList);
