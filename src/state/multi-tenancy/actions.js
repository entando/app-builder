import { getCurrentTenant } from 'api/multiTenancy';

import { SET_CURRENT_TENANT } from 'state/multi-tenancy/types';

// eslint-disable-next-line import/prefer-default-export
export const setCurrentTenant = tenant => ({
  type: SET_CURRENT_TENANT,
  payload: tenant,
});

export const fetchCurrentTenant = () => async (dispatch) => {
  try {
    const response = await getCurrentTenant();
    const json = await response.json();
    if (response.ok && json.payload) {
      dispatch(setCurrentTenant(json.payload));
    } else {
      // json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      // do nothing...
    }
  } catch (e) {
    // do nothing...
  }
};
