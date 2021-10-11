import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';
import {
  getAssetsList,
  getFilteringCategories,
  getAssetsView,
  getFileType,
  getActiveFilters,
  getListFilterParams,
} from 'state/assets/selectors';
import {
  applyAssetsFilter,
  setActiveFilters,
  setListFilterParams,
  fetchAssetsPaged,
  sortAssetsList,
  removeActiveFilter,
  changeFileType,
  changeAssetsView,
  makeFilter,
  pageDefault,
  fetchRawAssetInfo,
  resetFilteringCategories,
  setAssetCategoryFilter,
} from 'state/assets/actions';
import { fetchMyGroups, setSelectedGroup } from 'state/groups/actions';
import { getLoading } from 'state/loading/selectors';
import { getLocale } from 'state/locale/selectors';
import { getCategoryTree, getCategoryTreeFetched } from 'state/categories/selectors';
import AssetsList from 'ui/assets/AssetsList';
import { NAMESPACE_ASSETS } from 'state/pagination/const';
import { getPagination } from 'state/pagination/selectors';
import { ARRAY_SORT_COLUMN_REPLACES } from 'state/assets/const';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/assets/EditAssetFormModal';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { DELETE_ASSET_MODAL_ID } from 'ui/assets/DeleteAssetModal';
import { CLONE_ASSET_MODAL_ID } from 'ui/assets/modals/clone-asset/CloneAssetModal';

const toggleCategoryInArray = (category, categories) => {
  if (categories.filter(cat => cat.code === category.code).length === 0) {
    return [...categories, category];
  }
  return categories.filter(c => c.code !== category.code);
};

export const mapStateToProps = (state, ownProps) => {
  const {
    page, lastPage, totalItems, pageSize,
  } = getPagination(state, NAMESPACE_ASSETS);
  return {
    assets: getAssetsList(state),
    language: getLocale(state),
    filteringCategories: getFilteringCategories(state),
    activeFilters: getActiveFilters(state),
    assetsView: getAssetsView(state),
    fileType: getFileType(state),
    loading: getLoading(state).assets,
    sort: getListFilterParams(state).sorting || {},
    lastPage,
    pageSize,
    totalItems,
    page,
    categories: getCategoryTree(state),
    categoryTreeFetched: getCategoryTreeFetched(state),
    showColumns: ownProps.showColumns || getColumnOrder(state, 'assetsList'),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    const {
      browseMode, assetType, ownerGroup, joinGroups,
    } = ownProps;
    if (browseMode) {
      dispatch(changeFileType(assetType));
    } else {
      const filters = {};
      dispatch(setListFilterParams(filters));
      dispatch(fetchMyGroups());
      dispatch(fetchAssetsPaged(undefined, undefined, ownerGroup, joinGroups));
    }
  },
  onSetColumnOrder: columnOrder => !ownProps.showColumns && dispatch(setColumnOrder(columnOrder, 'assetsList')),
  onApplyFilteredSearch: (filters) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(setActiveFilters(filters));
    let filtprops = {};
    if (filters.length) {
      const values = filters.length > 1 ? filters.map(filter => filter.code) : filters[0].code;
      filtprops = { categories: makeFilter(values) };
    }
    dispatch(applyAssetsFilter(filtprops, undefined, ownerGroup, joinGroups));
  },
  onResetFilteringCategories: () => dispatch(resetFilteringCategories()),
  onRemoveActiveFilter: (category, filteringCategories) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(removeActiveFilter(category));
    dispatch(setAssetCategoryFilter(toggleCategoryInArray(category, filteringCategories)));
    const newFilters = filteringCategories.filter(c => c.code !== category.code).map(c => c.code);
    const filtSend = newFilters.length ? {
      categories: makeFilter(newFilters.length > 1 ? newFilters : newFilters[0]),
    } : {};
    dispatch(applyAssetsFilter(filtSend, undefined, ownerGroup, joinGroups));
  },
  onChangeFileType: (fileType) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(changeFileType(fileType));
    dispatch(fetchAssetsPaged(undefined, undefined, ownerGroup, joinGroups));
  },
  onChangeAssetsView: (assetsView) => {
    dispatch(changeAssetsView(assetsView));
  },
  fetchList: (page = pageDefault) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(fetchAssetsPaged(page, undefined, ownerGroup, joinGroups));
  },
  onApplySort: (attribute, direction) => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(sortAssetsList(
      get(ARRAY_SORT_COLUMN_REPLACES, attribute, attribute),
      direction,
      undefined,
      ownerGroup,
      joinGroups,
    ));
  },
  onRemoveAllActiveFilters: () => {
    const { ownerGroup, joinGroups } = ownProps;
    dispatch(setActiveFilters([]));
    dispatch(setListFilterParams({}));
    dispatch(fetchAssetsPaged(undefined, undefined, ownerGroup, joinGroups));
  },
  onAssetSelected: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
    dispatch(setSelectedGroup(item.group));
  },
  onClickDelete: (asset) => {
    dispatch(setVisibleModal(DELETE_ASSET_MODAL_ID));
    dispatch(setInfo(asset));
  },
  onUseAssetClicked: (asset) => {
    dispatch(fetchRawAssetInfo(asset.id)).then(ownProps.onUseAsset);
    dispatch(setVisibleModal(''));
  },
  onDuplicateClicked: (asset) => {
    dispatch(setVisibleModal(CLONE_ASSET_MODAL_ID));
    dispatch(setInfo(Object.assign({}, { id: asset.id, name: asset.name })));
  },
});

const AssetsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsList);

export default injectIntl(AssetsListContainer);
