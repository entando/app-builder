import {
  SET_ASSETS,
  SET_ASSET_SYNC,
  SET_ASSET_CATEGORY_FILTER,
  SET_ACTIVE_FILTERS,
  REMOVE_ACTIVE_FILTER,
  FILE_TYPE_CHANGE,
  ASSETS_VIEW_CHANGE,
  SET_LIST_FILTER_PARAMS,
  SET_ASSET_SEARCH_KEYWORD,
  RESET_FILTERING_CATEGORIES,
  SET_ASSET_COUNT,
} from 'state/assets/types';

const defaultState = {
  assets: [],
  assetsMap: {},
  filteringCategories: [],
  activeFilters: [],
  filterParams: {},
  keyword: '',
  assetsView: 'list',
  fileType: 'all',
  paginationOptions: {
    page: 1,
    perPage: 5,
    lastPage: 1,
    totalItems: 0,
    perPageOptions: [5, 10, 15, 25, 50],
  },
  assetsCount: {},
};

export const toMap = array => array.reduce((acc, asset) => {
  acc[asset.id] = asset;
  return acc;
}, {});
export const toIdList = array => array.map(asset => asset.id);

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_ASSET_CATEGORY_FILTER: {
      const { categories } = action.payload;
      return {
        ...state,
        filteringCategories: categories,
      };
    }
    case RESET_FILTERING_CATEGORIES: {
      return {
        ...state,
        filteringCategories: [],
      };
    }
    case SET_ASSETS: {
      const assets = toIdList(action.payload);
      const assetsMap = toMap(action.payload);
      return {
        ...state,
        assets,
        assetsMap,
      };
    }
    case SET_ASSET_SYNC: {
      const newStateMap = { ...state.assetsMap };
      newStateMap[action.payload.id] = action.payload;
      return {
        ...state,
        assetsMap: newStateMap,
      };
    }
    case SET_LIST_FILTER_PARAMS: {
      return {
        ...state,
        filterParams: action.payload,
      };
    }
    case SET_ACTIVE_FILTERS: {
      const filters = action.payload;
      return {
        ...state,
        activeFilters: filters,
      };
    }
    case REMOVE_ACTIVE_FILTER: {
      const filter = action.payload;
      const { activeFilters } = state;
      return {
        ...state,
        activeFilters: activeFilters.filter(f => f.code !== filter.code),
      };
    }
    case SET_ASSET_SEARCH_KEYWORD: {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    case FILE_TYPE_CHANGE: {
      const fileType = action.payload;
      return {
        ...state,
        fileType,
      };
    }
    case ASSETS_VIEW_CHANGE: {
      const assetsView = action.payload;
      return {
        ...state,
        assetsView,
      };
    }
    case SET_ASSET_COUNT: {
      const { type, count } = action.payload;
      const currentCount = state.assetsCount;
      currentCount[type] = count;
      return {
        ...state,
        assetsCount: currentCount,
      };
    }
    default:
      return state;
  }
};

export default reducer;
