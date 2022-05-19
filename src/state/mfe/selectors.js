
import { createSelector } from 'reselect';


const getMfeState = state => (state ? state.mfe : {});
const getProps = (_, props) => props;

const CONTENT_TARGET = 'content';
const PRIMARY_MENU_TARGET = 'primary-menu';
const PRIMARY_HEADER_TARGET = 'primary-header';

export const getMfeConfigList = createSelector(
  getMfeState,
  mfe => mfe.mfeList,
);

export const getMfeTargetContent = createSelector(
  getMfeState,
  mfe => (mfe.mfeList || []).filter(m => m.target === CONTENT_TARGET),
);

export const getMfeTargetPrimaryMenu = createSelector(
  getMfeState,
  mfe => (mfe.mfeList || []).find(m => m.target === PRIMARY_MENU_TARGET),
);

export const getMfeTargetPrimaryHeader = createSelector(
  getMfeState,
  mfe => (mfe.mfeList || []).find(m => m.target === PRIMARY_HEADER_TARGET),
);

export const getMfeByTarget = createSelector(
  getMfeState,
  getProps,
  (mfe, targetId) => (mfe.mfeList || []).filter(m => m.target === targetId),
);

export const getMfeById = createSelector(
  getMfeState,
  getProps,
  (mfe, id) => ((mfe && mfe.mfeList) || []).find(m => m.id === id) || {},
);
