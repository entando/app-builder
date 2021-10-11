import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { PAGINATION_VIEW, PaginationRow } from 'patternfly-react';
import { DataTable, TABLE_SORT_DIRECTION, ROW_ACTION_ALIGN } from '@entando/datatable';
import paginatorMessages from 'ui/common/paginatorMessages';

const RadioButtonTableSelect = React.forwardRef((props, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  return (
    <Fragment>
      <input type="radio" ref={resolvedRef} {...props} />
    </Fragment>
  );
});

class ContentList extends Component {
  constructor(props) {
    super(props);
    // enables our custom header formatters extensions to reactabular
    this.onSort = this.onSort.bind(this);
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.markSelectedContents = this.markSelectedContents.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
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
    onFilteredSearch(
      null,
      newPagination,
      { attribute, direction: direction.toUpperCase() },
    );
  }

  handleRowSelect(event) {
    const { onContentSelect } = this.props;
    onContentSelect(event.target.value);
  }

  showingColumns() {
    const {
      activeColumns, availableColumns, intl,
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
          case 'created':
          case 'lastModified':
            columnFormat = {
              ...columnFormat,
              Cell: ({ value }) => new Date(value).toLocaleString(),
            };
            break;
          case 'typeCode':
            columnFormat = {
              ...columnFormat,
              Cell: ({ row: { original: content } }) => content.typeDescription,
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
      intl, totalItems, page, pageSize, perPageOptions, selectedContent,
      lastPage, sortingColumns, activeColumns, onSetCurrentColumnsShow,
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

    const rowAction = {
      Header: intl.formatMessage({ id: 'cms.contents.select' }),
      cellAttributes: {
        className: 'text-center',
      },
      Cell: ({ original: content }) => (
        <RadioButtonTableSelect name="selected-content" checked={selectedContent === content.id} id={`content${content.id}`} value={content.id} onChange={this.handleRowSelect} />
      ),
    };

    return (
      <div>
        <div className="Contents__table">
          <DataTable
            columns={columns}
            data={contents}
            rowAction={rowAction}
            rowActionAlign={ROW_ACTION_ALIGN.ALIGN_LEFT}
            columnResizable
            onColumnReorder={onSetCurrentColumnsShow}
            useSorting={activeColumns}
            onChangeSort={this.onSort}
            classNames={{
              table: 'table-hover table-striped Contents__table-element',
            }}
            sortBy={{
              id: sortingColumns.attribute,
              desc: sortingColumns.direction === TABLE_SORT_DIRECTION.DESC,
            }}
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
      </div>
    );
  }
}

ContentList.propTypes = {
  intl: intlShape.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  onSetSort: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onContentSelect: PropTypes.func.isRequired,
  selectedContent: PropTypes.string.isRequired,
};

ContentList.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
  onSetCurrentColumnsShow: () => {},
};

export default ContentList;
