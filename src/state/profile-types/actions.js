import { gotoRoute, getParams } from '@entando/router';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addErrors } from 'state/errors/actions';
import { initialize } from 'redux-form';

import {
  ROUTE_PROFILE_TYPE_LIST,
  ROUTE_PROFILE_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_ADD,
} from 'app-init/router';

import {
  postProfileType,
  putProfileType,
  deleteProfileType,
  getProfileType,
  getProfileTypes,
  deleteAttributeFromProfileType,
  getAttributeFromProfileType,
  postAttributeFromProfileType,
  putAttributeFromProfileType,
  getProfileTypeAttributes,
  getProfileTypeAttribute,
} from 'api/profileTypes';
import {
  SET_PROFILE_TYPES,
  REMOVE_PROFILE_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_PROFILE_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  SET_SELECTED_ATTRIBUTE,
}
  from 'state/profile-types/types';
import { getProfileTypeAttributesIdList, getProfileTypeSelectedAttributeType } from 'state/profile-types/selectors';

const TYPE_MONOLIST = 'Monolist';

// Data type
export const setProfileTypes = ProfileTypes => ({
  type: SET_PROFILE_TYPES,
  payload: {
    ProfileTypes,
  },
});

export const removeProfileType = ProfileTypeCode => ({
  type: REMOVE_PROFILE_TYPE,
  payload: {
    ProfileTypeCode,
  },
});

export const setSelectedProfileType = ProfileType => ({
  type: SET_SELECTED_PROFILE_TYPE,
  payload: {
    ProfileType,
  },
});

export const setSelectedAttributeProfileType = attribute => ({
  type: SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  payload: {
    attribute,
  },
});

export const removeAttribute = (ProfileTypeCode, attributeCode) => ({
  type: REMOVE_ATTRIBUTE,
  payload: {
    ProfileTypeCode,
    attributeCode,
  },
});

// Data type attributes
export const setSelectedAttribute = attribute => ({
  type: SET_SELECTED_ATTRIBUTE,
  payload: {
    attribute,
  },
});

export const setProfileTypeAttributes = attributes => ({
  type: SET_ATTRIBUTES,
  payload: {
    attributes,
  },
});


// thunk

export const sendPostProfileType = ProfileTypeObject => dispatch =>
  new Promise((resolve) => {
    postProfileType(ProfileTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendPutProfileType = ProfileTypeObject => dispatch =>
  new Promise((resolve) => {
    putProfileType(ProfileTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendDeleteProfileType = ProfileTypeCode => dispatch =>
  new Promise((resolve) => {
    deleteProfileType(ProfileTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeProfileType(ProfileTypeCode));
          gotoRoute(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const fetchProfileType = ProfileTypeCode => dispatch => (
  new Promise((resolve) => {
    getProfileType(ProfileTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedProfileType(json.payload));
          dispatch(initialize('ProfileType', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const fetchProfileTypes = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('ProfileTypes'));
    getProfileTypes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setProfileTypes(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('ProfileTypes'));
        resolve();
      });
    });
  })
);

export const fetchAttributeFromProfileType = (ProfileTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    getAttributeFromProfileType(ProfileTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttributeProfileType(json.payload));
          dispatch(initialize('attribute', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);


export const sendPostAttributeFromProfileType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const ProfileTypeCode = getParams(getState()).entityCode;
    const list = getProfileTypeSelectedAttributeType(getState());
    postAttributeFromProfileType(ProfileTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: ProfileTypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { ProfileTypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromProfileType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const ProfileTypeCode = getParams(getState()).entityCode;
    putAttributeFromProfileType(ProfileTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (json.payload.type === TYPE_MONOLIST) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: ProfileTypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { ProfileTypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromProfileTypeMonolist = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const ProfileTypeCode = getParams(getState()).entityCode;
    putAttributeFromProfileType(ProfileTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { ProfileTypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendDeleteAttributeFromProfileType = (ProfileTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    deleteAttributeFromProfileType(ProfileTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(ProfileTypeCode, attributeCode));
          gotoRoute(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);


export const fetchProfileTypeAttributes = (page = { page: 1, pageSize: 0 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('ProfileTypes'));
    getProfileTypeAttributes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const list = getProfileTypeAttributesIdList(getState());
          if (!list || list.length === 0) {
            dispatch(setProfileTypeAttributes(json.payload));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('ProfileTypes'));
        resolve();
      });
    });
  })
);

export const fetchProfileTypeAttribute = ProfileTypeAttributeCode => dispatch => (
  new Promise((resolve) => {
    getProfileTypeAttribute(ProfileTypeAttributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttribute(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);
