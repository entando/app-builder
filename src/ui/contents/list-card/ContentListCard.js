import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, DropdownButton, MenuItem } from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { DataTable } from '@entando/datatable';
import { formatDate, hasAccess } from '@entando/utils';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { getContentStatusDetails } from 'ui/contents/ContentsTable';
import { SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';

import paginatorMessages from 'ui/common/paginatorMessages';

class ContentListCard extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['description', 'lastEditor', 'typeDescription', 'status', 'lastModified']);
    }
    onDidMount();
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
      lastEditor: {
        Header: <FormattedMessage id="cms.contents.versioning.author" />,
        attributes: {
          style: { width: '13%' },
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
          className: 'text-center',
          style: { width: '12%' },
        },
        Cell: (cellInfo) => {
          const { row: { original: content } } = cellInfo;
          const { color, title } = getContentStatusDetails(content.status, content.onLine, intl);
          return (
            <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
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
    const { onDidMount } = this.props;
    onDidMount(page);
  }

  changePageSize(pageSize) {
    const { onDidMount } = this.props;
    onDidMount(1, pageSize);
  }

  render() {
    const {
      intl, pagination: { page, totalItems, pageSize: perPage }, contentTypes,
      onClickAddContent, userPermissions, contents, onSetColumnOrder,
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
        bsStyle="primary"
        className="pull-right"
        title={intl.formatMessage({ id: 'cms.contents.add.title' })}
        id="addContent"
      >
        {
        contentTypes.map(contentType => (
          <MenuItem
            eventKey={contentType.code}
            key={contentType.code}
            onClick={() => (
              onClickAddContent({ typeCode: contentType.code, typeDescription: contentType.name })
            )}
          >
            {contentType.name}
          </MenuItem>
        ))
      }
      </DropdownButton>
    );

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const columns = this.getColumnDefs() || [];

    return (
      <div className="ContentListCard">
        <h2>
          <FormattedMessage id="dashboard.content.title" defaultMessage="Content" />
          {renderAddContentButton}
        </h2>
        <div className="ContentListCardTable__wrapper">
          <DataTable
            columns={columns}
            data={contents}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            classNames={{
              table: 'table-striped ContentListCardTable__table',
              row: 'VersioningListRow',
              cell: 'VersioningListRow__td',
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
  onSetColumnOrder: () => {},
  columnOrder: ['description', 'lastEditor', 'typeDescription', 'status', 'lastModified'],
};

export default injectIntl(ContentListCard);
