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
    if (response.ok) {
      dispatch(setCurrentTenant(json.payload));
      // check on response and set tenant to unauthorized into state
    } else if (response.status === 403) {
      dispatch(setCurrentTenant('unauthorized'));
    } else {
      dispatch(setCurrentTenant(null));
    }
  } catch (e) {
    dispatch(setCurrentTenant(null));
  }
};
