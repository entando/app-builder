import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import {
  Spinner,
  CardGrid,
  Grid,
  Row,
  Col,
  PaginationRow,
  PAGINATION_VIEW_TYPES,
  Filter,
  Toolbar,
  DropdownKebab,
  MenuItem,
  Button,
} from 'patternfly-react';
import { formatDate } from '@entando/utils';
import { DataTable, TABLE_SORT_DIRECTION } from '@entando/datatable';
import CategoryTypeaheadFilterContainer from 'ui/categories/filter/CategoryTypeaheadFilterContainer';
import AssetsListGridView from 'ui/assets/AssetsListGridView';
import paginatorMessages from 'ui/common/paginatorMessages';
import {
  ASSET_COLUMN_HEADERS,
  DEFAULT_ASSET_COLUMNS,
  SORTABLE_COLUMNS,
  ASSET_FILETYPES,
} from 'state/assets/const';

class AssetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: window.innerWidth < 992,
      selectedAsset: null,
    };
    this.messages = defineMessages({
      filterPlaceholder: {
        id: 'cms.assets.list.filterBy',
        defaultMessage: 'Filter by',
      },
    });
    this.onPerPageSelect = this.onPerPageSelect.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleAssetSelect = this.handleAssetSelect.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // redux-form is making this component to rerender many times unnecessarely
    // this will ensure the component render will only be triggered when really necessary
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
    && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  onFileTypeChange(fileType) {
    const { onChangeFileType } = this.props;
    onChangeFileType(fileType);
  }

  onPageChange(page) {
    const { fetchList, pageSize } = this.props;
    fetchList({ page, pageSize });
  }

  onPerPageSelect(pageSize) {
    const { fetchList } = this.props;
    fetchList({ page: 1, pageSize });
  }

  updateWindowDimensions() {
    const { onChangeAssetsView, assetsView } = this.props;
    const currentInnerWidth = window.innerWidth;
    if (currentInnerWidth < 992 && assetsView !== 'grid') {
      onChangeAssetsView('grid');
    }
    this.setState({ mobile: window.innerWidth < 992 });
  }

  handleRemoveActiveFilter(item) {
    const { onRemoveActiveFilter, activeFilters } = this.props;
    onRemoveActiveFilter(item, activeFilters);
  }

  handleAssetSelect(code) {
    this.setState({
      selectedAsset: code,
    });
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(code);
    }
  }

  removeAllActiveFilters() {
    const { onRemoveAllActiveFilters, onResetFilteringCategories } = this.props;
    onRemoveAllActiveFilters();
    onResetFilteringCategories();
  }

  render() {
    const {
      intl,
      loading,
      assets,
      filteringCategories,
      language,
      fileType,
      assetsView,
      sort,
      onApplyFilteredSearch,
      onChangeAssetsView,
      onApplySort,
      onUseAssetClicked,
      activeFilters,
      lastPage,
      totalItems,
      browseMode,
      pageSize: perPage,
      page,
      perPageOptions,
      onAssetSelected,
      onClickDelete,
      showColumns,
      hideFooter,
      singleView,
      onDuplicateClicked,
      categories,
      onSelect,
      categoryTreeFetched,
      onSetColumnOrder,
    } = this.props;
    const pagination = {
      page,
      perPage,
      perPageOptions,
    };
    const { mobile, selectedAsset } = this.state;
    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * perPage) + 1;
    const itemsEnd = Math.min(page * perPage, totalItems);
    const hideCategoryBox = categoryTreeFetched && categories.length === 0;

    const renderFileTypes = ASSET_FILETYPES.map((type, i) => (
      <div
        tabIndex={i}
        key={type.id}
        role="button"
        onKeyDown={() => this.onFileTypeChange(type.id)}
        onClick={() => this.onFileTypeChange(type.id)}
        className={`AssetsList__file-type text-center ${
          fileType === type.id ? 'AssetsList__file-type--selected' : ''
        }`}
      >
        <FormattedMessage id={`cms.assets.list.${type.id}`} />
      </div>
    ));
    const optClassSel = 'AssetsList__view-option--selected';
    const gridViewClass = `fa fa-th AssetsList__view-option ${
      assetsView === 'grid' ? optClassSel : ''
    }`;
    const listViewClass = `fa fa-list AssetsList__view-option ${
      assetsView === 'list' ? optClassSel : ''
    }`;
    const renderAppliedFilters = activeFilters && !loading && (
      <Toolbar.Results className="AssetsList__toolbar-results">
        <span className="AssetsList__items-count">
          {assets.length} <FormattedMessage id="cms.assets.list.of" /> {totalItems}{' '}
          <FormattedMessage id="cms.assets.list.items" />
        </span>
        <Filter.ActiveLabel className="AssetsList__filters-label">
          <FormattedMessage id="cms.assets.list.activeFilters" />:
        </Filter.ActiveLabel>
        <Filter.List>
          {activeFilters.map(item => (
            <Filter.Item
              key={item.code}
              onRemove={() => this.handleRemoveActiveFilter(item)}
              filterData={item}
            >
              {item.titles[language]}
            </Filter.Item>
          ))}
        </Filter.List>
        {activeFilters.length > 0 && (
          <span
            type="button"
            role="button"
            tabIndex={0}
            className="AssetsList__ca"
            onClick={() => this.removeAllActiveFilters()}
            onKeyDown={() => this.removeAllActiveFilters()}
          >
            <FormattedMessage id="cms.assets.list.clearAll" />
          </span>
        )}
      </Toolbar.Results>
    );
    const mappedColumnHeaders = ASSET_COLUMN_HEADERS.reduce((acc, curr) => ({
      ...acc,
      [curr.name]: { ...curr },
    }), {});

    const columnsDef = showColumns.map(col => mappedColumnHeaders[col])
      .map(curr => ({
        Header: <FormattedMessage id={`cms.assets.list.${curr.name}`} />,
        accessor: curr.name,
        attributes: {
          style: { width: curr.width },
        },
        Cell: ({ row: { original: asset }, column, value }) => {
          switch (column.id) {
            case 'preview': {
              const assetFileType = asset.versions == null ? 'file' : 'image';
              return assetFileType === 'image' ? (
                <img src={`${asset.previewUrl}?updatedAt=${asset.updatedAt}`} alt="Preview" />
              ) : (
                <div className="fa fa-file-text AssetsList__item-file" />
              );
            }
            case 'name': {
              return asset.name;
            }
            case 'uploadedBy': {
              return asset.owner || 'N/A';
            }
            case 'uploadedAt': {
              return formatDate(asset.createdAt);
            }
            case 'group': {
              return get(asset, 'group.name', asset.group);
            }
            case 'categories': {
              return asset.categories.map(cat => (
                <span key={cat.code || cat}>
                  {cat && cat.titles && cat.titles[language]}
                  <br />
                </span>
              ));
            }
            default: return value;
          }
        },
        cellAttributes: ({ row: { original: asset }, column }) => {
          if (column.id === 'preview') {
            return { className: asset.fileType === 'file' ? 'text-center' : '' };
          }
          return {};
        },
      }));

    const rowAction = {
      Header: <FormattedMessage id="cms.assets.list.actions" />,
      attributes: {
        className: 'text-center',
        width: '7%',
      },
      Cell: ({ original: asset }) => (
        browseMode ? (
          <Button onClick={() => onUseAssetClicked(asset)}>
            <FormattedMessage id="cms.label.use" defaultMessage="Use" />
          </Button>
        ) : (
          <DropdownKebab className="AssetsList__item-actions" id={`AssetsList__item-action-${asset.id}`} pullRight={browseMode}>
            <MenuItem onClick={() => onAssetSelected(asset)}>
              <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
            </MenuItem>
            <MenuItem onClick={() => onDuplicateClicked(asset)}>
              <FormattedMessage id="cms.label.duplicate" defaultMessage="Duplicate" />
            </MenuItem>
            <MenuItem onClick={() => window.open(asset.downloadUrl)}>
              <FormattedMessage id="cms.label.download" defaultMessage="Download" />
            </MenuItem>
            <MenuItem onClick={() => onClickDelete(asset)}>
              <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
            </MenuItem>
          </DropdownKebab>
        )
      ),
    };

    const hasSortIdAlt = sort.attribute
      && ASSET_COLUMN_HEADERS.find(col => col.id && col.id === sort.attribute);
    const sortAttribute = hasSortIdAlt ? hasSortIdAlt.name : sort.attribute;

    const tableContent = (
      <DataTable
        columns={columnsDef}
        data={assets}
        rowAction={browseMode && onSelect ? null : rowAction}
        columnResizable={!browseMode || !onSelect}
        onColumnReorder={browseMode && onSelect ? null : onSetColumnOrder}
        classNames={{
          table: 'table-hover AssetsList__table',
        }}
        useSorting={showColumns.filter(col => SORTABLE_COLUMNS.includes(col))}
        onChangeSort={onApplySort}
        rowAttributes={row => ({
          className: `AssetsList__item ${selectedAsset === row.id ? 'selected' : ''}`,
          onClick: () => browseMode && this.handleAssetSelect(row.id),
        })}
        sortBy={{
          id: sortAttribute,
          desc: sort.direction === TABLE_SORT_DIRECTION.DESC,
        }}
      />
    );
    const gridContent = (
      <AssetsListGridView
        assets={assets}
        onEditClicked={onAssetSelected}
        onClickDelete={onClickDelete}
        browseMode={browseMode}
        onItemSelected={onUseAssetClicked}
        onDuplicateClicked={onDuplicateClicked}
      />
    );
    const emptyContent = (
      <div className="AssetsList__nothing-found">
        <FormattedMessage id="cms.assets.list.nothingFound" />.
      </div>
    );

    let bodyContent = emptyContent;
    if (assets.length > 0) {
      bodyContent = assetsView === 'list' ? tableContent : gridContent;
    }
    const content = (
      <CardGrid className="AssetsList__files-grid">
        <div className="AssetsList__files-header">
          {!browseMode ? renderFileTypes : null}
          {mobile || singleView ? null : (
            <div className="AssetsList__view-options">
              <span
                className={gridViewClass}
                onClick={() => onChangeAssetsView('grid')}
                onKeyDown={() => onChangeAssetsView('grid')}
                role="button"
                tabIndex={-3}
              />
              <span
                className={listViewClass}
                onClick={() => onChangeAssetsView('list')}
                onKeyDown={() => onChangeAssetsView('list')}
                role="button"
                tabIndex={-4}
              />
            </div>
          )}
        </div>
        <Row className="AssetsList__body">
          {
            hideCategoryBox ? null : (
              <Col xs={mobile ? 12 : 2} className="no-padding">
                <CategoryTypeaheadFilterContainer
                  language={language}
                  onApplyFilteredSearch={onApplyFilteredSearch}
                  filteredCategories={filteringCategories}
                  filterSubject="asset"
                  noLabel
                  applyFilterParams={(
                    fileType === 'all' ? null : { type: fileType }
                  )}
                />
                {mobile && !loading ? <div className="AssetsList__filter-info">{renderAppliedFilters}</div> : null}
              </Col>
            )
          }
          {mobile ? null : (
            <Col
              xs={hideCategoryBox ? 12 : 10}
              className={`AssetsList__files-container no-padding ${hideCategoryBox ? 'AssetsList__files-container--no-border' : ''}`}
            >
              <div className="AssetsList__filter-info">{renderAppliedFilters}</div>
              <Spinner loading={!!loading}>
                {bodyContent}
              </Spinner>
            </Col>
          )}
        </Row>
        {mobile ? (
          <Row>
            <Col xs={12} className="AssetsList__files-container--mobile no-padding">
              <Spinner loading={!!loading}>
                {bodyContent}
              </Spinner>
            </Col>
          </Row>
        ) : null}
      </CardGrid>
    );

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="AssetsList__wrap">
        {content}
        {!loading && !hideFooter && (
          <div className="AssetsList__footer startLeftPos">
            <Grid>
              <PaginationRow
                viewType={PAGINATION_VIEW_TYPES[0]}
                pageInputValue={page}
                pagination={pagination}
                amountOfPages={lastPage}
                pageSizeDropUp
                itemCount={totalItems}
                itemsStart={itemsStart}
                itemsEnd={itemsEnd}
                onPerPageSelect={this.onPerPageSelect}
                onFirstPage={() => this.onPageChange(1)}
                onPreviousPage={() => this.onPageChange(page - 1)}
                onNextPage={() => this.onPageChange(page + 1)}
                onLastPage={() => this.onPageChange(lastPage)}
                messages={messages}
              />
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

AssetsList.propTypes = {
  intl: intlShape.isRequired,
  loading: PropTypes.bool,
  assetsView: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    attribute: PropTypes.string,
    direction: PropTypes.string,
  }),
  assets: PropTypes.arrayOf(PropTypes.shape({})),
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})),
  activeFilters: PropTypes.arrayOf(PropTypes.shape({})),
  onApplySort: PropTypes.func.isRequired,
  onApplyFilteredSearch: PropTypes.func.isRequired,
  onRemoveActiveFilter: PropTypes.func.isRequired,
  onChangeAssetsView: PropTypes.func.isRequired,
  onRemoveAllActiveFilters: PropTypes.func.isRequired,
  onChangeFileType: PropTypes.func.isRequired,
  onUseAssetClicked: PropTypes.func,
  fetchList: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  onAssetSelected: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  browseMode: PropTypes.bool,
  onDuplicateClicked: PropTypes.func.isRequired,
  onResetFilteringCategories: PropTypes.func.isRequired,
  showColumns: PropTypes.arrayOf(PropTypes.string),
  hideFooter: PropTypes.bool,
  singleView: PropTypes.bool,
  onSelect: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  categoryTreeFetched: PropTypes.bool,
  onSetColumnOrder: PropTypes.func,
};

AssetsList.defaultProps = {
  loading: false,
  assets: [],
  filteringCategories: [],
  activeFilters: [],
  sort: {
    attribute: 'description',
    direction: 'ASC',
  },
  perPageOptions: [5, 10, 15, 25, 50],
  browseMode: false,
  onUseAssetClicked: null,
  showColumns: DEFAULT_ASSET_COLUMNS,
  hideFooter: false,
  singleView: false,
  onSelect: null,
  categories: [],
  categoryTreeFetched: false,
  onSetColumnOrder: () => {},
};

export default injectIntl(AssetsList);
