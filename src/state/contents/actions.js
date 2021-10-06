import { toggleLoading } from 'state/loading/actions';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import {
  getContents, deleteContent, publishContent,
  updateContents, publishMultipleContents, getContentsStatus, cloneContent,
} from 'api/contents';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_CONTENTS } from 'state/pagination/const';
import { getPagination } from 'state/pagination/selectors';
import {
  getContentType, getGroup, getFilteringCategories,
  getStatusChecked, getAccessChecked, getAuthorChecked, getCurrentQuickFilter,
  getSortingColumns, getCurrentAuthorShow, getCurrentStatusShow,
} from 'state/contents/selectors';
import { addErrors, addToast, clearErrors, TOAST_ERROR } from '@entando/messages';
import {
  SET_CONTENTS, SET_QUICK_FILTER, SET_CONTENT_CATEGORY_FILTER,
  CHECK_STATUS, CHECK_ACCESS, CHECK_AUTHOR, SET_CURRENT_AUTHOR_SHOW,
  SET_CURRENT_STATUS_SHOW, SET_SORT, SET_CONTENT_TYPE, SET_TAB_SEARCH,
  SET_GROUP, SELECT_ROW, SELECT_ROWS, SELECT_ALL_ROWS,
  SET_JOIN_CONTENT_CATEGORY, RESET_JOIN_CONTENT_CATEGORIES,
  RESET_AUTHOR_STATUS, SELECT_SINGLE_ROW, CLEAR_CONTENTS_STATE, SET_CONTENTS_STATUS,
} from 'state/contents/types';
import { parseJoinGroups } from 'helpers/joinGroups';

const pageDefault = { page: 1, pageSize: 10 };

export const leaveContentsPage = () => ({
  type: CLEAR_CONTENTS_STATE,
});

export const setContents = (contents, namespace) => ({
  type: SET_CONTENTS,
  payload: { contents, namespace },
});

export const setTabSearch = tabSearch => ({
  type: SET_TAB_SEARCH,
  payload: tabSearch,
});

export const setQuickFilter = quickFilter => ({
  type: SET_QUICK_FILTER,
  payload: quickFilter,
});

export const setContentType = contentType => ({
  type: SET_CONTENT_TYPE,
  payload: contentType,
});

export const setGroup = group => ({
  type: SET_GROUP,
  payload: group,
});

export const setSort = sort => ({
  type: SET_SORT,
  payload: sort,
});

export const setContentCategoryFilter = categories => ({
  type: SET_CONTENT_CATEGORY_FILTER,
  payload: { categories },
});

export const setJoinContentCategory = categories => ({
  type: SET_JOIN_CONTENT_CATEGORY,
  payload: { categories },
});

export const resetJoinContentCategories = () => ({
  type: RESET_JOIN_CONTENT_CATEGORIES,
});

export const checkStatus = status => ({
  type: CHECK_STATUS,
  payload: status,
});

export const checkAccess = status => ({
  type: CHECK_ACCESS,
  payload: status,
});

export const checkAuthor = author => ({
  type: CHECK_AUTHOR,
  payload: author,
});

export const setCurrentAuthorShow = author => ({
  type: SET_CURRENT_AUTHOR_SHOW,
  payload: author,
});

export const setCurrentStatusShow = status => ({
  type: SET_CURRENT_STATUS_SHOW,
  payload: status,
});

export const selectSingleRow = row => ({
  type: SELECT_SINGLE_ROW,
  payload: row,
});
export const selectRow = row => ({
  type: SELECT_ROW,
  payload: row,
});
export const selectRows = rows => ({
  type: SELECT_ROWS,
  payload: rows,
});

export const selectAllRows = checked => ({
  type: SELECT_ALL_ROWS,
  payload: checked,
});

export const resetAuthorStatus = () => ({
  type: RESET_AUTHOR_STATUS,
});

export const setContentsStatus = payload => ({
  type: SET_CONTENTS_STATUS,
  payload,
});

export const fetchContents = (
  page = pageDefault,
  params,
  namespace = NAMESPACE_CONTENTS,
  mode,
) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contents'));
  getContents(page, params, mode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContents(json.payload, namespace));
          dispatch(setPage(json.metaData, namespace));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(selectAllRows(false));
        dispatch(toggleLoading('contents'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentsWithFilters = (
  params,
  newPagination,
  newSort,
  quickFilterStatusParam = '',
  quickFilterOwnerGroup,
  joinGroupsToParse,
) => (dispatch, getState) => {
  const state = getState();
  const pagination = newPagination || getPagination(state, NAMESPACE_CONTENTS);
  const sortingColumns = getSortingColumns(state);
  const quickFilter = getCurrentQuickFilter(state);
  const { id, value: qfValue } = quickFilter;
  const columnKey = sortingColumns.attribute;
  const sortDirection = sortingColumns.direction;
  const sorting = newSort || { attribute: columnKey, direction: sortDirection.toUpperCase() };
  let query = '';
  const filters = [];
  const eq = FILTER_OPERATORS.EQUAL;
  const like = FILTER_OPERATORS.LIKE;
  const ownerGroupQuery = quickFilterOwnerGroup ? `&forLinkingWithOwnerGroup=${quickFilterOwnerGroup}` : '';
  const joinGroups = parseJoinGroups(joinGroupsToParse);
  const joinGroupsQuery = (joinGroups && joinGroups.length > 0)
    ? joinGroups.reduce((acc, curr, index) => `${acc}&forLinkingWithExtraGroups[${index}]=${curr}`, '') : '';
  if (params) {
    const formValues = {
      ...(qfValue && { [id]: qfValue }),
    };
    const operators = {
      ...(qfValue && { [id]: FILTER_OPERATORS.LIKE }),
    };
    query = `${convertToQueryString({ formValues, operators, sorting })}&${params}${quickFilterStatusParam}${ownerGroupQuery}${joinGroupsQuery}`;
    return dispatch(fetchContents(pagination, query, NAMESPACE_CONTENTS, 'full'));
  }
  if (qfValue) {
    filters.push({ att: id, value: qfValue, operator: FILTER_OPERATORS.LIKE });
  } else {
    const contentType = getContentType(state);
    const group = getGroup(state);
    const filteringCategories = getFilteringCategories(state);
    const status = getStatusChecked(state);
    const access = getAccessChecked(state);
    const author = getAuthorChecked(state);
    const statusValue = status === 'draft' ? ['new', 'draft'] : status;
    if (contentType) filters.push({ att: 'typeCode', value: contentType });
    if (group) filters.push({ att: 'mainGroup', value: group });
    if (status) filters.push({ att: 'status', value: statusValue, operator: like });
    if (access) filters.push({ att: 'restriction', value: access === 'free' ? 'OPEN' : 'RESTRICTED' });
    if (author && author !== 'all') filters.push({ att: 'firstEditor', value: author });
    if (filteringCategories && filteringCategories.length) filters.push({ att: 'categories', value: filteringCategories });
  }
  const formValues = {};
  const operators = {};
  let published = '';
  let categories = '';
  filters.forEach(({ att, value, operator }) => {
    if (att === 'categories') {
      value.forEach((filter, i) => {
        categories += `&categories[${i}]=${filter.code}`;
      });
      categories += '&orClauseCategoryFilter=true';
      return null;
    } if (att === 'status' && value === 'published') {
      published = '&status=published';
      return null;
    }
    formValues[att] = value;
    operators[att] = operator || eq;
    return null;
  });
  query = `${convertToQueryString({ formValues, operators, sorting })}${categories}${quickFilterStatusParam || published}${ownerGroupQuery}${joinGroupsQuery}`;
  return dispatch(fetchContents(pagination, query, NAMESPACE_CONTENTS, 'full'));
};

export const fetchContentsWithTabs = (
  page,
  newSort,
  ownerGroup,
  joinGroupsToParse,
) => (dispatch, getState) => {
  const state = getState();
  const pagination = page || getPagination(state, NAMESPACE_CONTENTS);
  const { attribute, direction } = getSortingColumns(state);
  const sorting = newSort || { attribute, direction: direction.toUpperCase() };
  const author = getCurrentAuthorShow(state);
  const status = getCurrentStatusShow(state);
  const published = status === 'published';
  const statusAll = status === 'all';
  const all = author === 'all';
  const eq = FILTER_OPERATORS.LIKE;
  const like = FILTER_OPERATORS.LIKE;
  const statusValue = status === 'draft' ? ['new', 'draft'] : status;
  const { id, value: qfValue } = getCurrentQuickFilter(state);
  const formValues = {
    ...(!statusAll && status && { status: published ? 'public' : statusValue }),
    ...(!all && author && { firstEditor: author }),
    ...(qfValue && { [id]: qfValue }),
  };
  const operators = {
    ...(!statusAll && status && { status: like }),
    ...(!all && author && { firstEditor: eq }),
    ...(qfValue && { [id]: FILTER_OPERATORS.LIKE }),
  };
  const query = convertToQueryString({
    formValues,
    operators,
    sorting,
  });
  const ownerGroupQuery = ownerGroup ? `&forLinkingWithOwnerGroup=${ownerGroup}` : '';
  const joinGroups = parseJoinGroups(joinGroupsToParse);
  const joinGroupsQuery = (joinGroups && joinGroups.length > 0)
    ? joinGroups.reduce((acc, curr, index) => `${acc}&forLinkingWithExtraGroups[${index}]=${curr}`, '') : '';
  const params = `${query}${ownerGroupQuery}${joinGroupsQuery}`;
  return dispatch(fetchContents(pagination, params, NAMESPACE_CONTENTS, 'full'));
};

export const fetchContentsPaged = ({
  params, page, sort, tabSearch,
  status, ownerGroup, joinGroups,
} = {}) => (dispatch) => {
  if (tabSearch) {
    return dispatch(fetchContentsWithTabs(page, sort, ownerGroup, joinGroups));
  }
  return dispatch(fetchContentsWithFilters(
    params, page, sort,
    status, ownerGroup, joinGroups,
  ));
};

export const sendDeleteContent = id => dispatch => new Promise((resolve) => {
  deleteContent(id)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendPublishContent = (id, status) => dispatch => new Promise((resolve) => {
  publishContent(id, status)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendPublishMultipleContents = (id, status) => dispatch => new Promise((resolve) => {
  publishMultipleContents(id, status)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendUpdateContents = contents => dispatch => new Promise((resolve) => {
  updateContents(contents)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentsPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const sendCloneContent = contentId => dispatch => new Promise((resolve) => {
  cloneContent(contentId)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {});
});

export const fetchContentsStatus = () => dispatch => new Promise((resolve) => {
  getContentsStatus().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentsStatus(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    }).catch(() => {});
  });
});
