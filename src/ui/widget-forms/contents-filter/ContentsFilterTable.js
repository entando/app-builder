import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import { get, isNull } from 'lodash';
import { Col, PAGINATION_VIEW, PaginationRow, Button } from 'patternfly-react';
import { DataTable, TABLE_SORT_DIRECTION } from '@entando/datatable';
import { SORT_ATTRIBUTE_REPLACES } from 'state/contents/const';
import { formatDate } from '@entando/utils';
import { getContentStatusDetails } from 'ui/contents/ContentsTable';
import paginatorMessages from 'ui/common/paginatorMessages';

class ContentsFilterTable extends Component {
  constructor(props) {
    super(props);
    this.onSort = this.onSort.bind(this);
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.onTableRowSelect = this.onTableRowSelect.bind(this);
    this.markSelectedContents = this.markSelectedContents.bind(this);
  }

  onPerPageSelect(eventKey) {
    const { onFilteredSearch } = this.props;
    const newPagination = {
      page: 1,
      pageSize: eventKey,
    };
    onFilteredSearch(null, newPagination);
  }

  onPageChange(newPage) {
    const {
      lastPage, pageSize, onFilteredSearch,
    } = this.props;
    if (newPage < 1 || newPage > lastPage) return 0;
    const newPagination = {
      page: newPage,
      pageSize,
    };
    return onFilteredSearch(null, newPagination);
  }

  onSort(attribute, direction) {
    const { onFilteredSearch, onSetSort, pageSize } = this.props;
    const updatedSortingColumns = { attribute, direction };
    const newPagination = { page: 1, pageSize };
    onSetSort(updatedSortingColumns);
    onFilteredSearch(null, newPagination, {
      attribute: get(SORT_ATTRIBUTE_REPLACES, attribute, attribute),
      direction: direction.toUpperCase(),
    });
  }

  onTableRowSelect(rows) {
    const {
      onSelectRow, contents,
    } = this.props;
    const row = rows[rows.length - 1];
    const selected = contents.find(content => content.id === row);
    onSelectRow(selected);
  }

  showingColumns() {
    const {
      activeColumns, availableColumns, intl, groups,
    } = this.props;
    const currentActiveColumns = [...activeColumns];
    const allColumns = availableColumns.map(column => column.code);
    return currentActiveColumns
      .filter(ac => allColumns.includes(ac))
      .map((code) => {
        let columnFormat = {
          Header: intl.formatMessage({ id: `cms.contents.${code}` }),
        };
        switch (code) {
          case 'description':
            columnFormat = {
              ...columnFormat,
              cellAttributes: {
                className: 'Contents__name-td',
                style: { textOverflow: 'ellipsis' },
              },
            };
            break;
          case 'code':
            columnFormat = {
              ...columnFormat,
              Cell: ({ row: { original: content } }) => content.id,
            };
            break;
          case 'created':
          case 'lastModified':
            columnFormat = {
              ...columnFormat,
              Cell: ({ value }) => formatDate(value),
            };
            break;
          case 'mainGroup':
            columnFormat = {
              ...columnFormat,
              cellAttributes: {
                style: { textOverflow: 'nowrap', whiteSpace: 'nowrap' },
              },
              Cell: ({ value }) => {
                const { name } = groups.find(g => g.code === value);
                return name || '';
              },
            };
            break;
          case 'groups':
            columnFormat = {
              ...columnFormat,
              cellAttributes: {
                style: { textOverflow: 'nowrap', whiteSpace: 'nowrap' },
              },
              Cell: ({ value: currentGroups }) => {
                const groupNames = currentGroups && currentGroups.map(cg => (
                  groups.filter(g => g.code === cg)[0] || {}
                ).name);
                return groupNames ? groupNames.join(', ') : '';
              },
            };
            break;
          case 'restriction':
            columnFormat = {
              ...columnFormat,
              cellAttributes: {
                className: 'text-center',
              },
              Cell: ({ row: { original: content } }) => {
                const { mainGroup } = content;
                return <span className={`fa fa-${mainGroup === 'free' ? 'unlock' : 'lock'}`} />;
              },
            };
            break;
          case 'typeCode':
            columnFormat = {
              ...columnFormat,
              Cell: ({ row: { original: content } }) => content.typeDescription,
            };
            break;
          case 'onLine':
            columnFormat = {
              ...columnFormat,
              cellAttributes: {
                className: 'text-center',
              },
              Cell: ({ value, row: { original: content } }) => {
                const { status } = content;
                const { color, title } = getContentStatusDetails(status, value, intl);
                return <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />;
              },
            };
            break;
          default:
            break;
        }
        return {
          accessor: code,
          ...columnFormat,
        };
      });
  }

  markSelectedContents() {
    const { contents, selectedRows } = this.props;
    return contents.map(c => (
      selectedRows.includes(c.id) ? Object.assign({}, c, { selected: true }) : c
    ));
  }

  render() {
    const {
      intl, totalItems, page, pageSize, perPageOptions, sortingColumns, selectedRows,
      lastPage, onContentPicked, pickedContents, onSetColumnOrder, activeColumns,
    } = this.props;
    const columns = this.showingColumns();
    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * pageSize) + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };
    const contents = this.markSelectedContents();

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const pickMode = !isNull(pickedContents) && !Number.isNaN(pickedContents.length);

    const rowAction = pickMode ? {
      Header: intl.formatMessage({ id: 'cms.contents.actions' }),
      cellAttributes: {
        className: 'table-view-pf-actions text-center',
        style: { width: 'inherit' },
      },
      Cell: ({ original: content }) => (
        <div>
          <Button
            onClick={() => onContentPicked(content)}
          >
            <FormattedMessage id="cms.label.add" />
          </Button>
        </div>
      ),
    } : null;

    const pickModeParams = pickMode ? {} : {
      rowSelectAccessor: 'id',
      onRowSelect: this.onTableRowSelect,
      selectedRows,
    };

    return (
      <Col>
        <div className="Contents__table">
          <DataTable
            columns={columns}
            data={contents}
            rowAction={rowAction}
            columnResizable
            hideSelectAll
            onColumnReorder={onSetColumnOrder}
            useSorting={activeColumns}
            onChangeSort={this.onSort}
            classNames={{
              table: 'table-hover table-striped Contents__table-element',
              tableBody: 'app-tour-step-19',
            }}
            sortBy={{
              id: sortingColumns.attribute,
              desc: sortingColumns.direction === TABLE_SORT_DIRECTION.DESC,
            }}
            {...pickModeParams}
          />
          <PaginationRow
            itemCount={totalItems}
            itemsStart={itemsStart}
            itemsEnd={itemsEnd}
            viewType={PAGINATION_VIEW.TABLE}
            pagination={pagination}
            amountOfPages={lastPage}
            pageInputValue={page}
            onPageSet={this.onPageSet}
            onPerPageSelect={this.onPerPageSelect}
            onFirstPage={() => this.onPageChange(1)}
            onPreviousPage={() => this.onPageChange(page - 1)}
            onPageInput={this.onPageInput}
            onNextPage={() => this.onPageChange(page + 1)}
            onLastPage={() => this.onPageChange(lastPage)}
            messages={messages}
          />
        </div>
      </Col>
    );
  }
}

ContentsFilterTable.propTypes = {
  intl: intlShape.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  sortingColumns: PropTypes.shape({
    attribute: PropTypes.string,
    direction: PropTypes.oneOf([TABLE_SORT_DIRECTION.ASC, TABLE_SORT_DIRECTION.DESC]),
  }).isRequired,
  pickedContents: PropTypes.arrayOf(PropTypes.string),
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onContentPicked: PropTypes.func,
  onSetColumnOrder: PropTypes.func,
};

ContentsFilterTable.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
  pickedContents: null,
  onContentPicked: () => {},
  onSetColumnOrder: () => {},
};

export default ContentsFilterTable;
