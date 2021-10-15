import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getContentsState = state => state.contents;

export const getContents = createSelector(
  getContentsState,
  contents => contents.contents,
);

export const getContentsWithNamespace = (state, namespace) => createSelector(
  getContentsState,
  contents => contents[namespace],
)(state);

export const getCurrentQuickFilter = createSelector(
  getContentsState,
  contents => contents.currentQuickFilter,
);

export const getFilteringCategories = createSelector(
  getContentsState,
  contents => contents.filteringCategories,
);

export const getJoiningCategories = createSelector(
  getContentsState,
  contents => contents.joiningCategories,
);

export const getStatusChecked = createSelector(
  getContentsState,
  contents => contents.statusChecked,
);

export const getContentType = createSelector(
  getContentsState,
  contents => contents.contentType,
);

export const getGroup = createSelector(
  getContentsState,
  contents => contents.group,
);

export const getAccessChecked = createSelector(
  getContentsState,
  contents => contents.accessChecked,
);

export const getAuthorChecked = createSelector(
  getContentsState,
  contents => contents.authorChecked,
);

export const getCurrentAuthorShow = createSelector(
  getContentsState,
  contents => contents.currentAuthorShow,
);

export const getCurrentStatusShow = createSelector(
  getContentsState,
  contents => contents.currentStatusShow,
);

export const getSortingColumns = (state, group = 'default') => createSelector(
  getContentsState,
  contents => get(
    contents,
    `sortingColumns.${group}`,
    contents.sortingColumns.default,
  ),
)(state);

export const getSelectedRows = createSelector(
  getContentsState,
  contents => contents.selectedRows,
);

export const getLastSelectedRow = createSelector(
  getContentsState,
  contents => contents.lastSelectedRow,
);

export const getTabSearchEnabled = createSelector(
  getContentsState,
  contents => contents.tabSearchEnabled,
);

export const getContentsStatus = createSelector(
  getContentsState,
  contents => contents.status,
);
