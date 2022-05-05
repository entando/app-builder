
import { createSelector } from 'reselect';


const getMfeState = state => state.mfe;

const CONTENT_TARGET = 'content';
const PRIMARY_MENU_TARGET = 'primary-menu';

export const getMfeConfigList = createSelector(
  getMfeState,
  mfe => mfe.mfeList,
);

export const getMfeTargetContent = createSelector(
  getMfeState,
  mfe => (mfe.mfeList || []).find(m => m.target === CONTENT_TARGET),
);

export const getMfeTargetPrimaryMenu = createSelector(
  getMfeState,
  mfe => (mfe.mfeList || []).find(m => m.target === PRIMARY_MENU_TARGET),
);
