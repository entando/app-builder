import { initialize } from 'redux-form';
import { formattedText, routeConverter } from '@entando/utils';
import moment from 'moment';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';
import { setPage } from 'state/pagination/actions';
import {
  postProfileType,
  putProfileType,
  deleteProfileType,
  getProfileType,
  getProfileTypes,
  getProfileTypesStatus,
  postProfileTypesStatus,
  deleteAttributeFromProfileType,
  getAttributeFromProfileType,
  postAttributeFromProfileType,
  putAttributeFromProfileType,
  getProfileTypeAttributes,
  getProfileTypeAttribute,
  moveAttributeUp,
  moveAttributeDown,
} from 'api/profileTypes';
import {
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeType,
  getSelectedProfileType,
} from 'state/profile-types/selectors';
import {
  history,
  ROUTE_PROFILE_TYPE_LIST,
  ROUTE_PROFILE_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
} from 'app-init/router';
import {
  SET_PROFILE_TYPES,
  REMOVE_PROFILE_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_PROFILE_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE,
  SET_SELECTED_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_PROFILE_TYPE_REFERENCE_STATUS,
} from 'state/profile-types/types';

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

export const setProfileTypeReferenceStatus = profileTypeStatus => ({
  type: SET_PROFILE_TYPE_REFERENCE_STATUS,
  payload: {
    profileTypeStatus,
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

export const moveAttributeUpSync = ({ entityCode, attributeCode, attributeIndex }) => ({
  type: MOVE_ATTRIBUTE_UP,
  payload: {
    entityCode,
    attributeCode,
    attributeIndex,
  },
});

export const moveAttributeDownSync = ({ entityCode, attributeCode, attributeIndex }) => ({
  type: MOVE_ATTRIBUTE_DOWN,
  payload: {
    entityCode,
    attributeCode,
    attributeIndex,
  },
});


// thunk

export const fetchProfileTypeReferenceStatus = () => dispatch => new Promise((resolve) => {
  getProfileTypesStatus().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setProfileTypeReferenceStatus(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const sendPostProfileTypeReferenceStatus = profileTypesCodes => dispatch =>
  (new Promise((resolve) => {
    postProfileTypesStatus({ profileTypesCodes }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  }));


export const sendPostProfileType = ProfileTypeObject => dispatch =>
  new Promise((resolve) => {
    postProfileType(ProfileTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast(formattedText('ProfileType.created'), TOAST_SUCCESS));
          history.push(routeConverter(
            ROUTE_PROFILE_TYPE_EDIT,
            { profiletypeCode: json.payload.code },
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });


export const sendPutProfileType = ProfileTypeObject => dispatch =>
  new Promise((resolve) => {
    putProfileType(ProfileTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendDeleteProfileType = profileTypeCode => dispatch =>
  new Promise((resolve) => {
    deleteProfileType(profileTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeProfileType(profileTypeCode));
          dispatch(addToast(
            formattedText('app.deleted', null, { type: 'profile type', code: profileTypeCode }),
            TOAST_SUCCESS,
          ));
          history.push(ROUTE_PROFILE_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        }
        resolve();
      });
    }).catch(() => {});
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
    }).catch(() => {});
  })
);


export const fetchProfileTypes = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('profileTypes'));
    getProfileTypes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setProfileTypes(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('profileTypes'));
        resolve();
      });
    }).catch(() => {});
  })
);

const fmtDateDDMMYYY = (date) => {
  let d = new Date(date);
  d = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  return moment(d, 'DD/MM/YYYY').format('DD/MM/YYYY');
};

export const fetchAttributeFromProfileType = (profileTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    getAttributeFromProfileType(profileTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttributeProfileType(json.payload));
          if (json.payload.code === 'Date') {
            let {
              rangeStartDate, rangeEndDate, equalDate,
              rangeStartDateAttribute, rangeEndDateAttribute, equalDateAttribute,
            } = json.payload.validationRules;
            rangeStartDate = rangeStartDate && fmtDateDDMMYYY(rangeStartDate);
            rangeEndDate = rangeEndDate && fmtDateDDMMYYY(rangeEndDate);
            equalDate = equalDate && fmtDateDDMMYYY(equalDate);
            rangeStartDateAttribute =
            rangeStartDateAttribute && fmtDateDDMMYYY(rangeStartDateAttribute);
            rangeEndDateAttribute =
            rangeEndDateAttribute && fmtDateDDMMYYY(rangeEndDateAttribute);
            equalDateAttribute = equalDateAttribute && fmtDateDDMMYYY(equalDateAttribute);
            const payload = {
              ...json.payload,
              validationRules: {
                rangeStartDate,
                rangeEndDate,
                equalDate,
                rangeStartDateAttribute,
                rangeEndDateAttribute,
                equalDateAttribute,
              },
            };
            dispatch(initialize('attribute', payload));
          } else {
            dispatch(initialize('attribute', json.payload));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);


export const sendPostAttributeFromProfileType = (
  attributeObject,
  entityCode,
) => (dispatch, getState) => (
  new Promise((resolve) => {
    const list = getProfileTypeSelectedAttributeType(getState());
    postAttributeFromProfileType(entityCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          history.push(routeConverter(
            ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
            {
              entityCode,
              attributeCode: attributeObject.code,
            },
          ));
        } else {
          history.push(routeConverter(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode: entityCode }));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutAttributeFromProfileType = (attributeObject, entityCode) => dispatch => (
  new Promise((resolve) => {
    putAttributeFromProfileType(entityCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (json.payload.type === TYPE_MONOLIST || json.payload.type === TYPE_LIST) {
          history.push(routeConverter(
            ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
            {
              entityCode,
              attributeCode: attributeObject.code,
            },
          ));
        } else {
          history.push(routeConverter(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode: entityCode }));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutAttributeFromProfileTypeMonolist = (
  attributeObject,
  entityCode,
) => dispatch => (
  new Promise((resolve) => {
    putAttributeFromProfileType(entityCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          history.push(routeConverter(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode: entityCode }));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendDeleteAttributeFromProfileType = attributeCode => (dispatch, getState) => (
  new Promise((resolve) => {
    const profileTypeCode = getSelectedProfileType(getState()).code;
    deleteAttributeFromProfileType(profileTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(profileTypeCode, attributeCode));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      }).catch(() => {});
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
    }).catch(() => {});
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
    }).catch(() => {});
  })
);

export const sendMoveAttributeUp = ({ entityCode, attributeCode, attributeIndex }) =>
  dispatch => (
    new Promise((resolve) => {
      moveAttributeUp(entityCode, attributeCode).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(moveAttributeUpSync({
              ...json.payload,
              entityCode,
              attributeIndex,
            }));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          resolve();
        });
      }).catch(() => {});
    })
  );

export const sendMoveAttributeDown = ({ entityCode, attributeCode, attributeIndex }) =>
  dispatch => (
    new Promise((resolve) => {
      moveAttributeDown(entityCode, attributeCode).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(moveAttributeDownSync({
              ...json.payload,
              entityCode,
              attributeIndex,
            }));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          resolve();
        });
      }).catch(() => {});
    })
  );
