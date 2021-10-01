import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { intlShape, FormattedMessage } from 'react-intl';
import {
  PAGINATION_VIEW, PaginationRow,
  MenuItem, DropdownKebab,
} from 'patternfly-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { formatDate, PermissionCheck } from '@entando/utils';
import { DataTable, TABLE_SORT_DIRECTION } from '@entando/datatable';
import DeleteContentModalContainer from 'ui/contents/DeleteContentModalContainer';
import PublishContentModalContainer from 'ui/contents/PublishContentModalContainer';
import JoinCategoriesModalContainer from 'ui/contents/JoinCategoriesModalContainer';
import { withPermissionValues } from 'ui/auth/withPermissions';
import { VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';
import { SORT_ATTRIBUTE_REPLACES } from 'state/contents/const';
import paginatorMessages from 'ui/common/paginatorMessages';

export const getContentStatusDetails = (status = '', hasPublicVersion, intl) => {
  const statusLowerCase = status.toLowerCase();
  let color = '';
  let titleId = '';
  if (statusLowerCase === 'public') {
    color = 'published';
    titleId = 'cms.content.status.published';
  } else if (statusLowerCase === 'ready') {
    color = 'review';
    if (hasPublicVersion) {
      titleId = 'cms.content.status.pendingChanges.publicNotEqualReady';
    } else {
      titleId = 'cms.content.status.unpublished.ready';
      color = 'unpublished';
    }
  } else {
    color = 'unpublished';
    if (hasPublicVersion) {
      titleId = 'cms.content.status.pendingChanges.publicNotEqualDraft';
      color = 'review';
    } else {
      titleId = 'cms.content.status.unpublished';
    }
  }
  const title = intl.formatMessage({ id: titleId });
  return { color, title };
};

class ContentsTable extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
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
              cellHoc: (cell, content, cellInfo) => {
                const { id, attributes } = content;
                const getAttrValue = attr => (attr.value && attr.value.urlDest)
                || (typeof attr.value !== 'object' && attr.value)
                || (attr.values && typeof attr.values.en !== 'object' && attr.values.en);

                const tooltipDetails = (
                  <table className="table" style={{ marginBottom: 0 }}>
                    <tbody>
                      {attributes.filter(attr => getAttrValue(attr)).map(attr => (
                        <tr key={attr.code}>
                          <th>{attr.code}</th>
                          <td>{getAttrValue(attr)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
                return (
                  <OverlayTrigger
                    placement="top"
                    overlay={(
                      <Tooltip id={`tooltip-${id}`} className="Contents__tablerow-tooltip">
                        {tooltipDetails}
                      </Tooltip>
                    )}
                    key={cellInfo.column.id}
                  >
                    {cell}
                  </OverlayTrigger>
                );
              },
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
      intl, totalItems, page, pageSize, perPageOptions, lastPage,
      onEditContent, onClickDelete, onClickPublish, onClickClone, userPermissions,
      onSelectRows, onSetColumnOrder, sortingColumns, activeColumns,
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
      Header: intl.formatMessage({ id: 'cms.contents.actions' }),
      cellAttributes: {
        className: 'table-view-pf-actions text-center',
        style: { width: 'inherit' },
      },
      Cell: ({ original: content }) => {
        const unpublishDisabled = content.status !== 'PUBLIC' && !content.onLine;
        const publishDisabled = content.status === 'PUBLIC';
        return (
          <div>
            <DropdownKebab id={`actionsKebab_${content.id}`} pullRight>
              <MenuItem onClick={() => onEditContent(content.id)}>
                <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
              </MenuItem>
              <MenuItem
                onClick={() => !content.onLine && onClickDelete(content)}
                disabled={content.onLine}
              >
                <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
              </MenuItem>
              <MenuItem onClick={() => onClickClone(content)}>
                <FormattedMessage id="cms.contents.clone" defaultMessage="Clone" />
              </MenuItem>
              <PermissionCheck
                requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
                userPermissions={userPermissions}
              >
                <MenuItem
                  onClick={() => !publishDisabled && onClickPublish([content], true)}
                  disabled={publishDisabled}
                >
                  <FormattedMessage id="cms.label.publish" defaultMessage="Publish" />
                </MenuItem>
              </PermissionCheck>
              <PermissionCheck
                requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
                userPermissions={userPermissions}
              >
                <MenuItem
                  onClick={() => !unpublishDisabled && onClickPublish([content], false)}
                  disabled={unpublishDisabled}
                >
                  <FormattedMessage id="cms.label.unpublish" defaultMessage="Unpublish" />
                </MenuItem>
              </PermissionCheck>
            </DropdownKebab>
          </div>
        );
      },
    };

    return (
      <div>
        <div className="Contents__table">
          <DataTable
            columns={columns}
            data={contents}
            rowAction={rowAction}
            columnResizable
            onColumnReorder={onSetColumnOrder}
            onRowSelect={onSelectRows}
            rowSelectAccessor="id"
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
          <DeleteContentModalContainer />
          <PublishContentModalContainer />
          <JoinCategoriesModalContainer />
        </div>
      </div>
    );
  }
}

ContentsTable.propTypes = {
  intl: intlShape.isRequired,
  activeColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
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
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRows: PropTypes.func.isRequired,
  onSetColumnOrder: PropTypes.func,
  onEditContent: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
  onClickClone: PropTypes.func.isRequired,
};

ContentsTable.defaultProps = {
  perPageOptions: [5, 10, 15, 25, 50],
  userPermissions: [],
  onSetColumnOrder: () => {},
};

export default withPermissionValues(ContentsTable);
