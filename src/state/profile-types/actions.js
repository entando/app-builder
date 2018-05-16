

import { gotoRoute, getParams } from '@entando/router';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addErrors } from 'state/errors/actions';
import { initialize } from 'redux-form';

import {
  ROUTE_PROFILE_TYPE_LIST,
  ROUTE_PROFILE_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
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
const TYPE_LIST = 'List';

// Profile type
export const setProfileTypes = profileTypes => ({
  type: SET_PROFILE_TYPES,
  payload: {
    profileTypes,
  },
});

export const removeProfileType = profileTypeCode => ({
  type: REMOVE_PROFILE_TYPE,
  payload: {
    profileTypeCode,
  },
});

export const setSelectedProfileType = profileType => ({
  type: SET_SELECTED_PROFILE_TYPE,
  payload: {
    profileType,
  },
});

export const setSelectedAttributeProfileType = attribute => ({
  type: SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  payload: {
    attribute,
  },
});

export const removeAttribute = (profileTypeCode, attributeCode) => ({
  type: REMOVE_ATTRIBUTE,
  payload: {
    profileTypeCode,
    attributeCode,
  },
});

// Profile type attributes
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
          // gotoRoute(ROUTE_PROFILE_TYPE_LIST);
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

export const sendDeleteProfileType = profileTypeCode => dispatch =>
  new Promise((resolve) => {
    deleteProfileType(profileTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeProfileType(profileTypeCode));
          gotoRoute(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const fetchProfileType = profileTypeCode => dispatch => (
  new Promise((resolve) => {
    getProfileType(profileTypeCode).then((response) => {
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

export const fetchAttributeFromProfileType = (profileTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    getAttributeFromProfileType(profileTypeCode, attributeCode).then((response) => {
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
    const profiletypeCode = getParams(getState()).entityCode;
    const list = getProfileTypeSelectedAttributeType(getState());
    postAttributeFromProfileType(profiletypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD, {
            entityCode: profiletypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromProfileType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const profiletypeCode = getParams(getState()).entityCode;
    putAttributeFromProfileType(profiletypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (json.payload.type === TYPE_MONOLIST || json.payload.type === TYPE_LIST) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD, {
            entityCode: profiletypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromProfileTypeMonolist = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const profiletypeCode = getParams(getState()).entityCode;
    putAttributeFromProfileType(profiletypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendDeleteAttributeFromProfileType = (profileTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    deleteAttributeFromProfileType(profileTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(profileTypeCode, attributeCode));
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
