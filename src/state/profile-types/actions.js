import { SET_PROFILE_TYPES } from 'state/profile-types/types';
import { getProfileTypes } from 'api/profileTypes';
import { setPage } from 'state/pagination/actions';


export const setProfileTypes = profileTypes => ({
  type: SET_PROFILE_TYPES,
  payload: {
    profileTypes,
  },
});

// thunk
export const fetchProfileTypes = (page = 1, params) => dispatch =>
  getProfileTypes(page, params).then((data) => {
    dispatch(setProfileTypes(data.payload));
    dispatch(setPage(data.metaData));
  });
