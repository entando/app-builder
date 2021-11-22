import { initialize } from 'redux-form';
import { METHODS } from '@entando/apimanager';
import { routeConverter } from '@entando/utils';
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
  postRefreshProfileType,
  getMyProfileType,
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
  PUSH_PARENT_SELECTED_ATTRIBUTE,
  POP_PARENT_SELECTED_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_PROFILE_TYPE_REFERENCE_STATUS,
  SET_ACTION_MODE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  MOVE_ATTRIBUTE_FROM_COMPOSITE,
  SET_SELECTED_NESTED_ATTRIBUTE,
} from 'state/profile-types/types';

import {
  TYPE_MONOLIST,
  TYPE_COMPOSITE,
  TYPE_LIST,
  TYPE_DATE,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/content-type/const';

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

export const setSelectedNestedAttribute = attribute => ({
  type: SET_SELECTED_NESTED_ATTRIBUTE,
  payload: {
    attribute,
  },
});

export const pushParentSelectedAttribute = attribute => ({
  type: PUSH_PARENT_SELECTED_ATTRIBUTE,
  payload: {
    attribute,
  },
});

export const popParentSelectedAttribute = () => ({
  type: POP_PARENT_SELECTED_ATTRIBUTE,
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

export const setActionMode = actionMode => ({
  type: SET_ACTION_MODE,
  payload: {
    actionMode,
  },
});

export const removeAttributeFromComposite = (attributeCode, isMonolistComposite = false) => ({
  type: REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  payload: {
    attributeCode,
    isMonolistComposite,
  },
});

export const moveAttributeFromComposite = (fromIndex, toIndex, isMonolistComposite = false) => ({
  type: MOVE_ATTRIBUTE_FROM_COMPOSITE,
  payload: {
    fromIndex,
    toIndex,
    isMonolistComposite,
  },
});

export const setNewAttributeComposite = attributeData => ({
  type: SET_NEW_ATTRIBUTE_COMPOSITE,
  payload: {
    attributeData,
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
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const sendPostProfileTypeReferenceStatus = profileTypeCodes => dispatch =>
  (new Promise((resolve) => {
    postProfileTypesStatus({ profileTypeCodes }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_PROFILE_TYPE_LIST);
          dispatch(fetchProfileTypeReferenceStatus());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  }));

export const sendPostRefreshProfileType = profileTypeCode => dispatch =>
  (new Promise((resolve) => {
    postRefreshProfileType(profileTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast({ id: 'ProfileType.refreshed' }, TOAST_SUCCESS));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          dispatch(addToast({ id: 'ProfileType.created' }, TOAST_SUCCESS));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
            { id: 'app.deleted', values: { type: 'profile type', code: profileTypeCode } },
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);


export const fetchMyProfileType = () => dispatch => (
  new Promise((resolve) => {
    getMyProfileType().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedProfileType(json.payload));
          dispatch(initialize('ProfileType', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          const joinRoles = json.payload.roles ? json.payload.roles.map(role => role.code) : [];
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
              joinRoles,
            };
            dispatch(initialize('attribute', payload));
          } else {
            dispatch(initialize('attribute', { ...json.payload, joinRoles }));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('ProfileTypes'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchProfileTypeAttribute = (
  ProfileTypeCode,
  ProfileTypeAttributeCode,
) => dispatch => (
  new Promise((resolve) => {
    getProfileTypeAttribute(ProfileTypeCode, ProfileTypeAttributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttribute(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

const convertDate = date => `${date
  .split('/')
  .reverse()
  .join('-')} 00:00:00`;

const convertDateValidationRules = (validationRules) => {
  const rules = {};
  if (validationRules) {
    const {
      rangeStartDate,
      rangeEndDate,
      equalDate,
      rangeStartDateAttribute,
      rangeEndDateAttribute,
      equalDateAttribute,
    } = validationRules;

    rules.rangeStartDate = rangeStartDate && convertDate(rangeStartDate);
    rules.rangeEndDate = rangeEndDate && convertDate(rangeEndDate);
    rules.equalDate = equalDate && convertDate(equalDate);
    rules.rangeStartDateAttribute = rangeStartDateAttribute
    && convertDate(rangeStartDateAttribute);
    rules.rangeEndDateAttribute = rangeEndDateAttribute
    && convertDate(rangeEndDateAttribute);
    rules.equalDateAttribute = equalDateAttribute
    && convertDate(equalDateAttribute);
  }
  return rules;
};

const getPayloadFromTypeAttribute = (values, allowedRoles) => {
  const { nestedAttribute } = values;
  const nestedAttributeType = values.listNestedType || (nestedAttribute && nestedAttribute.type);
  let payload = {
    ...values,
    code: values.code,
    type: values.type,
    roles: values.joinRoles
      ? values.joinRoles.map(roleId => ({ code: roleId, descr: allowedRoles[roleId] }))
      : [],
    nestedAttribute: {
      ...nestedAttribute,
      type: nestedAttributeType,
      code: values.code,
      enumeratorStaticItems: 'default',
      enumeratorStaticItemsSeparator: ',',
    },
  };
  if (payload.type === TYPE_DATE) {
    payload = {
      ...payload,
      validationRules: convertDateValidationRules(payload.validationRules),
    };
  }
  return payload;
};

const getPayloadFromTypeAttributeComposite = (composite, childAttribute) => ({
  ...composite,
  compositeAttributes: Array.isArray(childAttribute) ? childAttribute : [childAttribute],
});

const getPayloadFromTypeMonolistAttributeComposite = (composite, childAttribute) => ({
  ...composite,
  nestedAttribute: {
    ...composite.nestedAttribute,
    compositeAttributes: Array.isArray(childAttribute) ? childAttribute : [childAttribute],
  },
});

export const handlerAttributeFromContentType = (
  action,
  values,
  allowedRoles,
  mode,
  entityCode,
  history = globalHistory,
) => (dispatch, getState) => {
  let payload = getPayloadFromTypeAttribute(values, allowedRoles);
  const isMonolistComposite = payload.type === TYPE_MONOLIST
  && payload.nestedAttribute.type === TYPE_COMPOSITE;
  if (action === METHODS.POST) {
    const attributeSelected = getAttributeSelectFromProfileType(getState()) || '';
    if (attributeSelected.type === TYPE_COMPOSITE && mode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
      dispatch(setActionMode(MODE_ADD_COMPOSITE));
      dispatch(sendPostAttributeFromProfileType(attributeSelected, entityCode, history));
    } else if (payload.type === TYPE_COMPOSITE || isMonolistComposite) {
      dispatch(setActionMode(MODE_ADD_COMPOSITE));
      dispatch(setNewAttributeComposite(payload));
      if (isMonolistComposite) {
        dispatch(setActionMode(MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE));
        const selectedAttr = getProfileTypeSelectedAttribute(getState());
        dispatch(pushParentSelectedAttribute(selectedAttr));
        history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
          entityCode,
          attributeCode: payload.code,
        }));
      }
    } else {
      const newAttributeComposite = getNewAttributeComposite(getState());
      if (!isUndefined(newAttributeComposite)) {
        const compositeAttributes = [...getSelectedCompositeAttributes(getState()), payload];
        payload = getPayloadFromTypeAttributeComposite(newAttributeComposite, compositeAttributes);
      }
      if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
        dispatch(setSelectedProfileTypeAttribute(payload));
        const parentAttr = getParentSelectedAttribute(getState());
        dispatch(popParentSelectedAttribute());
        dispatch(setSelectedAttributeRef(parentAttr));
        dispatch(handlerAttributeFromProfileType(
          action,
          payload,
          allowedRoles,
          mode,
          entityCode,
          history,
        ));
      } else if (mode === MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE) {
        payload = getPayloadFromTypeMonolistAttributeComposite(
          newAttributeComposite,
          [
            ...getSelectedCompositeAttributes(getState()),
            getPayloadFromTypeAttribute(values, allowedRoles),
          ],
        );
        dispatch(setSelectedProfileTypeAttribute(payload));
        const parentAttr = getParentSelectedAttribute(getState());
        dispatch(popParentSelectedAttribute());
        dispatch(setSelectedAttributeRef(parentAttr));
        dispatch(handlerAttributeFromProfileType(
          action,
          payload,
          allowedRoles,
          mode,
          entityCode,
          history,
        ));
      } else {
        dispatch(sendPostAttributeFromProfileType(payload, entityCode, history));
      }
    }
  } else {
    dispatch(setActionMode(MODE_EDIT));
    const isComposite = values.type === TYPE_COMPOSITE
    || payload.type === TYPE_COMPOSITE || isMonolistComposite;
    if (isComposite) {
      if (mode === MODE_EDIT_COMPOSITE) {
        dispatch(sendPutAttributeFromProfileType(payload, entityCode, mode, history));
      }
      dispatch(setActionMode(MODE_EDIT_COMPOSITE));
    } else {
      if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
        const compositeData = getAttributeSelectFromProfileType(getState());
        if (getIsMonolistCompositeAttributeType(getState())) {
          compositeData.nestedAttribute.compositeAttributes.push(payload);
        } else {
          compositeData.compositeAttributes.push(payload);
        }
        payload = compositeData;
        dispatch(setActionMode(MODE_EDIT_COMPOSITE));
      }
      dispatch(sendPutAttributeFromProfileType(payload, entityCode, mode, history));
    }
  }
};

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
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
          resolve();
        });
      }).catch(() => {});
    })
  );
