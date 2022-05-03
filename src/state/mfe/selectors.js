
import { createSelector } from 'reselect';


const getMfeState = state => state.mfe;


// eslint-disable-next-line
export const getMfeConfigList = createSelector(
  getMfeState,
  mfe => mfe.mfeList,
);
