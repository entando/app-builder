import { METHODS } from '@entando/apimanager';
import { addErrors } from '@entando/messages';
import moment from 'moment';
import { isUndefined } from 'lodash';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_CONTENT_TYPES } from 'state/pagination/const';
import {
  SET_CONTENT_TYPES,
  SET_SELECTED_CONTENT_TYPE,
  REMOVE_ATTRIBUTE,
  SET_SELECTED_ATTRIBUTE,
  PUSH_PARENT_SELECTED_ATTRIBUTE,
  POP_PARENT_SELECTED_ATTRIBUTE,
  SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_ACTION_MODE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  MOVE_ATTRIBUTE_FROM_COMPOSITE,
  SET_SELECTED_NESTED_ATTRIBUTE,
} from 'state/content-type/types';
import {
  history as globalHistory,
  ROUTE_CMS_CONTENTTYPE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';
import { routeConverter } from '@entando/utils';
import { toggleLoading } from 'state/loading/actions';
import {
  getActionModeContentTypeSelectedAttribute,
  getMonolistAttributeType,
  getFormTypeValue,
  getSelectedAttributeType,
  getContentTypeSelectedAttributeType,
  getContentTypeSelectedAttribute,
  getParentSelectedAttribute,
  getSelectedCompositeAttributes,
  getIsMonolistCompositeAttributeType,
  getAttributeSelectFromContentType,
  getNewAttributeComposite,
  getSelectedContentType,
} from 'state/content-type/selectors';
import { initialize } from 'redux-form';

import {
  TYPE_MONOLIST,
  TYPE_COMPOSITE,
  TYPE_DATE,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/content-type/const';

import {
  getContentTypes,
  getContentType,
  getContentTypeAttribute,
  getAttributeFromContentType,
  moveAttributeUp,
  moveAttributeDown,
  postAttributeFromContentType,
  putAttributeFromContentType,
  deleteAttributeFromContentType,
} from 'api/contentTypes';

export const setContentTypeList = list => ({
  type: SET_CONTENT_TYPES,
  payload: { list },
});

export const setSelectedContentType = contentType => ({
  type: SET_SELECTED_CONTENT_TYPE,
  payload: {
    contentType,
  },
});

export const clearSelectedContentType = () => ({
  type: SET_SELECTED_CONTENT_TYPE,
  payload: {
    contentType: {},
  },
});

export const setSelectedContentTypeAttribute = attribute => ({
  type: SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE,
  payload: {
    attribute,
  },
});

export const removeAttribute = (contentTypeCode, attributeCode) => ({
  type: REMOVE_ATTRIBUTE,
  payload: {
    contentTypeCode,
    attributeCode,
  },
});

export const setSelectedAttributeRef = attribute => ({
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

// thunks
export const fetchContentTypeListPaged = (
  page = { page: 1, pageSize: 10 },
  params = '',
  namespace = NAMESPACE_CONTENT_TYPES,
) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentTypeList'));
  getContentTypes(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentTypeList(json.payload, namespace));
          dispatch(setPage(json.metaData, namespace));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('contentTypeList'));
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentType = (
  contentTypeCode,
  initForm = true,
) => dispatch => new Promise((resolve, reject) => {
  getContentType(contentTypeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedContentType(json.payload));
          if (initForm) {
            dispatch(initialize('ContentType', json.payload));
          }
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          reject();
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const fetchContentTypeAttributeRef = (
  contentTypeCode,
  contentTypeAttributeCode,
  routeFunc,
  selectedAttributeType = '',
  formName,
) => (dispatch, getState) => new Promise((resolve) => {
  let typeAttribute = contentTypeAttributeCode;

  const checkCompositeSubAttribute = selectedAttributeType === TYPE_COMPOSITE
    || (selectedAttributeType === TYPE_MONOLIST
      && getMonolistAttributeType(getState()) === TYPE_COMPOSITE);

  if (checkCompositeSubAttribute) {
    typeAttribute = getFormTypeValue(getState(), formName);
    dispatch(setActionMode(MODE_ADD_ATTRIBUTE_COMPOSITE));
    const selectedAttr = getContentTypeSelectedAttribute(getState());
    dispatch(pushParentSelectedAttribute(selectedAttr));
  }
  const actionMode = getActionModeContentTypeSelectedAttribute(getState());
  if (typeAttribute === TYPE_COMPOSITE && actionMode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
    resolve();
  } else {
    getContentTypeAttribute(contentTypeCode, typeAttribute)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setSelectedAttributeRef(json.payload));
            switch (actionMode) {
              case MODE_ADD_ATTRIBUTE_COMPOSITE: {
                dispatch(initialize(formName, {
                  type: json.payload.code,
                  compositeAttributeType: TYPE_COMPOSITE,
                  code: '',
                  name: '',
                }));
                break;
              }
              case MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE: {
                dispatch(initialize(formName, { type: json.payload.code }));
                break;
              }
              case MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE: {
                const nestedAttribute = {
                  ...json.payload,
                  type: json.payload.code,
                  compositeAttributeType: TYPE_COMPOSITE,
                };
                dispatch(initialize(formName, { nestedAttribute }));
                break;
              }
              default:
                break;
            }
            if (routeFunc && actionMode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
              routeFunc();
            }
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          resolve();
        });
      })
      .catch(() => {});
  }
});

export const fetchNestedAttribute = (contentTypeCode, typeAttribute) => dispatch => (
  new Promise((resolve) => {
    getContentTypeAttribute(contentTypeCode, typeAttribute)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setSelectedNestedAttribute(json.payload));
            resolve();
          }
        });
      }).catch(() => resolve());
  })
);

const fmtDateDDMMYYY = (date) => {
  let d = new Date(date);
  d = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  return moment(d, 'DD/MM/YYYY').format('DD/MM/YYYY');
};

export const fetchAttributeFromContentType = (formName, contentTypeCode, attributeCode) => (
  dispatch,
  getState,
) => new Promise((resolve) => {
  getAttributeFromContentType(contentTypeCode, attributeCode)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const joinRoles = json.payload.roles ? json.payload.roles.map(role => role.code) : [];
          let payload = {
            ...json.payload,
            joinRoles,
            joinAllowedOptions: joinRoles,
            compositeAttributeType: TYPE_COMPOSITE,
          };
          const { type, nestedAttribute } = payload;
          const nestedAttributeType = nestedAttribute && nestedAttribute.type;
          if (type === TYPE_DATE || nestedAttributeType === TYPE_DATE) {
            let {
              rangeStartDate,
              rangeEndDate,
              equalDate,
              rangeStartDateAttribute,
              rangeEndDateAttribute,
              equalDateAttribute,
            } = nestedAttributeType ? nestedAttribute.validationRules : payload.validationRules;
            rangeStartDate = rangeStartDate && fmtDateDDMMYYY(rangeStartDate);
            rangeEndDate = rangeEndDate && fmtDateDDMMYYY(rangeEndDate);
            equalDate = equalDate && fmtDateDDMMYYY(equalDate);
            rangeStartDateAttribute = rangeStartDateAttribute
              && fmtDateDDMMYYY(rangeStartDateAttribute);
            rangeEndDateAttribute = rangeEndDateAttribute && fmtDateDDMMYYY(rangeEndDateAttribute);
            equalDateAttribute = equalDateAttribute && fmtDateDDMMYYY(equalDateAttribute);
            const validationRules = {
              rangeStartDate,
              rangeEndDate,
              equalDate,
              rangeStartDateAttribute,
              rangeEndDateAttribute,
              equalDateAttribute,
            };
            payload = {
              ...payload,
              ...(nestedAttributeType ? {
                nestedAttribute: {
                  ...nestedAttribute,
                  validationRules,
                },
              } : {
                validationRules,
              }),
            };
          }
          const actionMode = getActionModeContentTypeSelectedAttribute(getState());
          if (actionMode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
            dispatch(initialize(formName, payload));
            dispatch(setSelectedContentTypeAttribute(json.payload));
            dispatch(fetchContentTypeAttributeRef(
              contentTypeCode,
              getSelectedAttributeType(getState()),
            ));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostAttributeFromContentType = (
  attributeObject,
  entityCode,
  history = globalHistory,
) => (dispatch, getState) => new Promise((resolve) => {
  const list = getContentTypeSelectedAttributeType(getState());
  postAttributeFromContentType(entityCode, attributeObject)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode,
            attributeCode: attributeObject.code,
          }));
        } else {
          history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPutAttributeFromContentType = (
  attributeObject,
  entityCode,
  mode,
  history = globalHistory,
) => (dispatch, getState) => new Promise((resolve) => {
  const list = getContentTypeSelectedAttributeType(getState());
  putAttributeFromContentType(entityCode, attributeObject)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list || (
          json.payload.type === TYPE_MONOLIST
          && !getIsMonolistCompositeAttributeType(getState())
        )) {
          history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode,
            attributeCode: attributeObject.code,
          }));
        } else {
          dispatch(setSelectedContentTypeAttribute(json.payload));
          const { type, code } = attributeObject;
          if (type === TYPE_COMPOSITE || (
            type === TYPE_MONOLIST
            && getIsMonolistCompositeAttributeType(getState())
          )) {
            dispatch(initialize('attribute', {
              ...json.payload,
              compositeAttributeType: TYPE_COMPOSITE,
            }));
            if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE
              || mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
              history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT, {
                entityCode,
                attributeCode: code,
              }));
            } else {
              history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
            }
          } else {
            history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
          }
        }
        resolve();
      });
    })
    .catch(() => {});
});

export const sendPostAttributeFromContentTypeMonolist = (
  attributeObject,
  entityCode,
  history = globalHistory,
) => dispatch => new Promise((resolve) => {
  postAttributeFromContentType(entityCode, attributeObject)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
        }
        resolve();
      });
    })
    .catch(() => {});
});

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

export const sendPutAttributeFromContentTypeMonolist = (
  attributeObject,
  entityCode,
  history = globalHistory,
) => dispatch => new Promise((resolve) => {
  const { nestedAttribute } = attributeObject;
  const payload = {
    ...attributeObject,
    nestedAttribute: {
      ...nestedAttribute,
      ...(nestedAttribute.type === TYPE_DATE ? ({
        validationRules: convertDateValidationRules(nestedAttribute.validationRules),
      }) : {}),
    },
  };
  putAttributeFromContentType(entityCode, payload)
    .then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: entityCode }));
        }
        resolve();
      });
    })
    .catch(() => {});
});

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
    const attributeSelected = getAttributeSelectFromContentType(getState()) || '';
    if (attributeSelected.type === TYPE_COMPOSITE && mode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
      dispatch(setActionMode(MODE_ADD_COMPOSITE));
      dispatch(sendPostAttributeFromContentType(attributeSelected, entityCode, history));
    } else if (payload.type === TYPE_COMPOSITE || isMonolistComposite) {
      dispatch(setActionMode(MODE_ADD_COMPOSITE));
      dispatch(setNewAttributeComposite(payload));
      if (isMonolistComposite) {
        dispatch(setActionMode(MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE));
        const selectedAttr = getContentTypeSelectedAttribute(getState());
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
        dispatch(setSelectedContentTypeAttribute(payload));
        const parentAttr = getParentSelectedAttribute(getState());
        dispatch(popParentSelectedAttribute());
        dispatch(setSelectedAttributeRef(parentAttr));
        dispatch(handlerAttributeFromContentType(
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
        dispatch(setSelectedContentTypeAttribute(payload));
        const parentAttr = getParentSelectedAttribute(getState());
        dispatch(popParentSelectedAttribute());
        dispatch(setSelectedAttributeRef(parentAttr));
        dispatch(handlerAttributeFromContentType(
          action,
          payload,
          allowedRoles,
          mode,
          entityCode,
          history,
        ));
      } else {
        dispatch(sendPostAttributeFromContentType(payload, entityCode, history));
      }
    }
  } else {
    dispatch(setActionMode(MODE_EDIT));
    const isComposite = values.type === TYPE_COMPOSITE
      || payload.type === TYPE_COMPOSITE || isMonolistComposite;
    if (isComposite) {
      if (mode === MODE_EDIT_COMPOSITE) {
        dispatch(sendPutAttributeFromContentType(payload, entityCode, mode, history));
      }
      dispatch(setActionMode(MODE_EDIT_COMPOSITE));
    } else {
      if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
        const compositeData = getAttributeSelectFromContentType(getState());
        if (getIsMonolistCompositeAttributeType(getState())) {
          compositeData.nestedAttribute.compositeAttributes.push(payload);
        } else {
          compositeData.compositeAttributes.push(payload);
        }
        payload = compositeData;
        dispatch(setActionMode(MODE_EDIT_COMPOSITE));
      }
      dispatch(sendPutAttributeFromContentType(payload, entityCode, mode, history));
    }
  }
};

export const sendDeleteAttributeFromContentType = attributeCode => (dispatch, getState) => (
  new Promise((resolve) => {
    const contentTypeCode = getSelectedContentType(getState()).code;
    deleteAttributeFromContentType(contentTypeCode, attributeCode)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(removeAttribute(contentTypeCode, attributeCode));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          resolve();
        });
      })
      .catch(() => {});
  })
);

export const sendMoveAttributeUp = ({ entityCode, attributeCode, attributeIndex }) => dispatch => (
  new Promise((resolve) => {
    moveAttributeUp(entityCode, attributeCode)
      .then((response) => {
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
      })
      .catch(() => {});
  })
);

export const sendMoveAttributeDown = ({ entityCode, attributeCode, attributeIndex }) => (
  dispatch => new Promise((resolve) => {
    moveAttributeDown(entityCode, attributeCode)
      .then((response) => {
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
      })
      .catch(() => {});
  })
);
