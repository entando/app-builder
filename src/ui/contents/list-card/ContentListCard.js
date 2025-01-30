import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, DropdownButton, MenuItem } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { DataTable } from '@entando/datatable';
import { formatDate, hasAccess } from '@entando/utils';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { getContentStatusDetails } from 'ui/contents/ContentsTable';
import {
  SUPERUSER_PERMISSION,
  ADMINISTRATION_AREA_PERMISSION,
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
} from 'state/permissions/const';

import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

import paginatorMessages from 'ui/common/paginatorMessages';
import Icon from 'ui/common/icon/Icon';
import StatusBadge from 'ui/pages/common/StatusBadge';

class ContentListCard extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const {
      onDidMount, columnOrder, onSetColumnOrder, userPermissions,
    } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['description', 'typeDescription', 'status', 'lastModified']);
    }
    if (hasAccess(ADMINISTRATION_AREA_PERMISSION, userPermissions)) {
      onDidMount();
    }
  }

  getColumnDefs() {
    const { columnOrder, intl } = this.props;

    const columnDefs = {
      description: {
        Header: <FormattedMessage id="contentPicker.description" />,
        attributes: {
          style: { width: '35%' },
        },
        cellAttributes: {
          className: 'SingleContentCurrentVersion__description',
        },
      },

      typeDescription: {
        Header: <FormattedMessage id="contentPicker.type" />,
        attributes: {
          style: { width: '15%' },
        },
      },
      status: {
        Header: <FormattedMessage id="contentPicker.status" />,
        attributes: {

          style: { width: '25%' },
        },
        Cell: (cellInfo) => {
          const {
            row: { original: content },
          } = cellInfo;
          const { color/* , title */ } = getContentStatusDetails(
            content.status,
            content.onLine,
            intl,
          );
          return (
            <StatusBadge status={color} />
          );
        },
        cellAttributes: {
          className: 'text-center',
        },
      },
      lastModified: {
        Header: <FormattedMessage id="cms.versioning.list.lastModify" />,
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
    const { onDidMount, pagination } = this.props;
    onDidMount(page, pagination.pageSize);
  }

  changePageSize(pageSize) {
    const { onDidMount } = this.props;
    onDidMount(1, pageSize);
  }

  render() {
    const {
      intl,
      pagination: { page, pageSize: perPage, totalItems },
      contentTypes,
      onClickAddContent,
      userPermissions,
      contents,
      onSetColumnOrder,
    } = this.props;


    const pagination = {
      page,
      perPage,
      perPageOptions: [5, 10, 15],
    };
    const renderAddContentButton = hasAccess(
      [SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION],
      userPermissions,
    ) && (
      <DropdownButton
        bsStyle="link"
        className="primary pull-right"
        title={intl.formatMessage({ id: 'cms.contents.add.title' })}
        id="addContent"
      >
          {contentTypes.map(contentType => (
            <MenuItem
              eventKey={contentType.code}
              key={contentType.code}
              onClick={() =>
                onClickAddContent({
                  typeCode: contentType.code,
                  typeDescription: contentType.name,
                })
              }
            >
              {contentType.name}
            </MenuItem>
          ))}
      </DropdownButton>
    );

    const messages = Object.keys(paginatorMessages).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: intl.formatMessage(paginatorMessages[curr]),
      }),
      {},
    );

    const columns = this.getColumnDefs() || [];

    return (
      <div className="ContentListCard">
        <ViewPermissionNoticeOverlay viewPermissions={[ADMINISTRATION_AREA_PERMISSION]}>
          <h2 className="card-pf-title">
            <div className="left-title">
              <Icon name="text" type="lucide" background className="primary" />
              <FormattedMessage id="dashboard.content.title" defaultMessage="Content" />
            </div>
            {renderAddContentButton}
          </h2>
          <div className="ContentListCardTable__wrapper">
            <DataTable
              columns={columns}
              data={contents}
              columnResizable
              onColumnReorder={onSetColumnOrder}
              classNames={{
                table: 'ContentListCardTable__table table-bordered',
                headerGroup: 'table-header',
                row: 'table-row',
                cell: 'table-cell',
              }}
            />
          </div>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            messages={messages}
          />
          <Clearfix />
        </ViewPermissionNoticeOverlay>
      </div>
    );
  }
}

ContentListCard.propTypes = {
  intl: intlShape.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  onDidMount: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
  }),
  onClickAddContent: PropTypes.func.isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

ContentListCard.defaultProps = {
  userPermissions: [],
  contents: [],
  contentTypes: [],
  pagination: {
    page: 1,
    totalItems: 0,
  },
  onSetColumnOrder: () => { },
  columnOrder: ['description', 'typeDescription', 'status', 'lastModified'],
};

export default injectIntl(ContentListCard);
