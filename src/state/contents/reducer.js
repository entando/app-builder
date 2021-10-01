import { TABLE_SORT_DIRECTION } from '@entando/datatable';
import {
  SET_QUICK_FILTER, SET_CONTENTS, SET_CONTENT_CATEGORY_FILTER,
  CHECK_STATUS, CHECK_ACCESS, CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW,
  SET_CURRENT_STATUS_SHOW,
  SET_SORT,
  SET_CONTENT_TYPE,
  SET_GROUP,
  SELECT_SINGLE_ROW,
  SELECT_ROW,
  SELECT_ROWS,
  SELECT_ALL_ROWS,
  SET_JOIN_CONTENT_CATEGORY,
  RESET_JOIN_CONTENT_CATEGORIES,
  SET_TAB_SEARCH,
  RESET_AUTHOR_STATUS,
  CLEAR_CONTENTS_STATE,
  SET_CONTENTS_STATUS,
} from 'state/contents/types';

const defaultState = {
  currentQuickFilter: {
    id: 'description',
    filterType: 'text',
    value: '',
  },
  filteringCategories: [],
  joiningCategories: [],
  sortingColumns: {
    attribute: 'lastModified',
    direction: TABLE_SORT_DIRECTION.DESC,
  },
  contents: [],
  statusChecked: '',
  accessChecked: '',
  authorChecked: '',
  selectedRows: [],
  currentAuthorShow: 'all',
  currentStatusShow: 'all',
  tabSearchEnabled: false,
  status: {},
  contentsStatus: {},
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CONTENTS: {
      const { contents, namespace } = action.payload;
      const newContents = contents || [];
      return {
        ...state,
        ...(namespace ? { [namespace]: newContents } : { contents: newContents }),
      };
    }
    case SET_TAB_SEARCH: {
      return {
        ...state,
        tabSearchEnabled: action.payload,
      };
    }
    case SET_QUICK_FILTER: {
      return {
        ...state,
        currentQuickFilter: Object.assign({}, action.payload),
      };
    }
    case SET_CONTENT_TYPE: {
      return {
        ...state,
        contentType: action.payload,
      };
    }
    case SET_GROUP: {
      return {
        ...state,
        group: action.payload,
      };
    }
    case CHECK_STATUS: {
      const newStatus = state.statusChecked !== action.payload ? action.payload : '';
      return {
        ...state,
        statusChecked: newStatus,
      };
    }
    case CHECK_ACCESS: {
      const newAccess = state.accessChecked !== action.payload ? action.payload : '';
      return {
        ...state,
        accessChecked: newAccess,
      };
    }
    case CHECK_AUTHOR: {
      const newAuthor = state.authorChecked !== action.payload ? action.payload : '';
      return {
        ...state,
        authorChecked: newAuthor,
      };
    }
    case SET_CURRENT_AUTHOR_SHOW: {
      return {
        ...state,
        currentAuthorShow: action.payload,
        tabSearchEnabled: !!action.payload,
      };
    }
    case SET_CURRENT_STATUS_SHOW: {
      return {
        ...state,
        currentStatusShow: action.payload,
        tabSearchEnabled: !!action.payload,
      };
    }
    case RESET_AUTHOR_STATUS: {
      return {
        ...state,
        currentStatusShow: 'all',
        tabSearchEnabled: false,
        currentAuthorShow: 'all',
      };
    }
    case SET_SORT: {
      return {
        ...state,
        sortingColumns: action.payload,
      };
    }
    case SELECT_SINGLE_ROW: {
      const lastSelectedRow = action.payload;
      const selectedRows = [lastSelectedRow.id];
      return {
        ...state,
        selectedRows,
        lastSelectedRow,
      };
    }
    case SELECT_ROW: {
      const row = action.payload;
      let { selectedRows } = state;
      const includes = selectedRows.filter(sr => sr === row.id).length > 0;
      if (includes) {
        selectedRows = selectedRows.filter(sr => sr !== row.id);
      } else {
        selectedRows.push(row.id);
      }
      return {
        ...state,
        selectedRows: selectedRows.slice(0),
      };
    }
    case SELECT_ROWS: {
      const rows = action.payload;
      return {
        ...state,
        selectedRows: rows,
      };
    }
    case SELECT_ALL_ROWS: {
      const checked = action.payload;
      let newSelectedRows = [];
      if (checked) {
        const { contents } = state;
        newSelectedRows = contents.map(content => content.id);
      }
      return {
        ...state,
        selectedRows: newSelectedRows,
      };
    }
    case SET_CONTENT_CATEGORY_FILTER: {
      const { categories } = action.payload;
      return {
        ...state,
        filteringCategories: categories,
      };
    }
    case SET_JOIN_CONTENT_CATEGORY: {
      const { categories } = action.payload;
      return {
        ...state,
        joiningCategories: categories,
      };
    }
    case RESET_JOIN_CONTENT_CATEGORIES: {
      return {
        ...state,
        joiningCategories: [],
      };
    }
    case CLEAR_CONTENTS_STATE: {
      return defaultState;
    }
    case SET_CONTENTS_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
