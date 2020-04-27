import { METHODS } from '@entando/apimanager';
import { addToast, addErrors, clearErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { initialize } from 'redux-form';
import { isUndefined } from 'lodash';
import moment from 'moment';

import {
  history,
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';

import {
  postDataType,
  putDataType,
  deleteDataType,
  getDataType,
  getDataTypes,
  getDataTypesStatus,
  postDataTypesStatus,
  deleteAttributeFromDataType,
  getAttributeFromDataType,
  postAttributeFromDataType,
  putAttributeFromDataType,
  getDataTypeAttributes,
  getDataTypeAttribute,
  moveAttributeUp,
  moveAttributeDown,
  postRefreshDataTypes,
} from 'api/dataTypes';
import {
  SET_DATA_TYPES,
  REMOVE_DATA_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_DATA_TYPE,
  SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  SET_SELECTED_ATTRIBUTE,
  MOVE_ATTRIBUTE_UP,
  MOVE_ATTRIBUTE_DOWN,
  SET_DATA_TYPE_REFERENCE_STATUS,
  SET_ACTION_MODE,
  REMOVE_ATTRIBUTE_FROM_COMPOSITE,
  MOVE_ATTRIBUTE_FROM_COMPOSITE,
  SET_NEW_ATTRIBUTE_COMPOSITE,
} from 'state/data-types/types';
import {
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeType,
  getSelectedDataType,
  getSelectedAttributeType,
  getFormTypeValue,
  getAttributeSelectFromDataType,
  getActionModeDataTypeSelectedAttribute,
  getNewAttributeComposite,
  getMonolistAttributeType,
  getIsMonolistComposteAttributeType,
} from 'state/data-types/selectors';

import {
  TYPE_MONOLIST,
  TYPE_COMPOSITE,
  TYPE_DATE,
  MODE_ADD,
  MODE_EDIT,
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/data-types/const';

// Data type
export const setDataTypes = dataTypes => ({
  type: SET_DATA_TYPES,
  payload: {
    dataTypes,
  },
});

export const removeDataType = dataTypeCode => ({
  type: REMOVE_DATA_TYPE,
  payload: {
    dataTypeCode,
  },
});

export const setSelectedDataType = dataType => ({
  type: SET_SELECTED_DATA_TYPE,
  payload: {
    dataType,
  },
});

export const setDataTypeReferenceStatus = dataTypeStatus => ({
  type: SET_DATA_TYPE_REFERENCE_STATUS,
  payload: {
    dataTypeStatus,
  },
});

export const setSelectedAttributeDataType = attribute => ({
  type: SET_SELECTED_ATTRIBUTE_FOR_DATATYPE,
  payload: {
    attribute,
  },
});

export const removeAttribute = (dataTypeCode, attributeCode) => ({
  type: REMOVE_ATTRIBUTE,
  payload: {
    dataTypeCode,
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

export const setDataTypeAttributes = attributes => ({
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

export const fetchDataTypeReferenceStatus = () => dispatch => new Promise((resolve) => {
  getDataTypesStatus().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setDataTypeReferenceStatus(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const sendPostDataTypeReferenceStatus = dataTypesCodes => dispatch =>
  (new Promise((resolve) => {
    postDataTypesStatus({ dataTypesCodes }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          history.push(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  }));

export const sendPostDataType = dataTypeObject => dispatch =>
  new Promise((resolve) => {
    postDataType(dataTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast({ id: 'dataType.created' }, TOAST_SUCCESS));
          history.push(routeConverter(
            ROUTE_DATA_TYPE_EDIT,
            { datatypeCode: json.payload.code },
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendPostRefreshDataTypes = dataTypeCode => dispatch =>
  new Promise((resolve) => {
    postRefreshDataTypes(dataTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast(json.payload.status, TOAST_SUCCESS));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve();
      });
    });
  });

export const sendPutDataType = dataTypeObject => dispatch =>
  new Promise((resolve) => {
    putDataType(dataTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast({ id: 'dataType.updated' }, TOAST_SUCCESS));
          history.push(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendDeleteDataType = dataTypeCode => dispatch =>
  new Promise((resolve) => {
    deleteDataType(dataTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeDataType(dataTypeCode));
          history.push(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const fetchDataType = dataTypeCode => dispatch => (
  new Promise((resolve) => {
    getDataType(dataTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedDataType(json.payload));
          dispatch(initialize('DataType', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDataTypes = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('dataTypes'));
    getDataTypes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDataTypes(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('dataTypes'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDataTypeAttribute =
 (dataTypeAttributeCode, route, selectedAttributeType = '', formName) =>
   (dispatch, getState) => (
     new Promise((resolve) => {
       let typeAttribute = dataTypeAttributeCode;

       const checkCompositeSubAttribute =
        selectedAttributeType === TYPE_COMPOSITE ||
        (selectedAttributeType === TYPE_MONOLIST &&
          getMonolistAttributeType(getState()) === TYPE_COMPOSITE);

       if (checkCompositeSubAttribute) {
         typeAttribute = getFormTypeValue(getState(), formName);
         dispatch(setActionMode(MODE_ADD_ATTRIBUTE_COMPOSITE));
       }
       const actionMode = getActionModeDataTypeSelectedAttribute(getState());
       if (typeAttribute === TYPE_COMPOSITE && actionMode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
         resolve();
       } else {
         getDataTypeAttribute(typeAttribute).then((response) => {
           response.json().then((json) => {
             if (response.ok) {
               dispatch(setSelectedAttribute(json.payload));
               switch (actionMode) {
                 case MODE_ADD_ATTRIBUTE_COMPOSITE: {
                   dispatch(initialize(formName, { type: json.payload.code, code: '', name: '' }));
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
                 default: break;
               }
               if (route && actionMode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
                 history.push(routeConverter(route.route, route.params));
               }
             } else {
               dispatch(addErrors(json.errors.map(err => err.message)));
             }
             resolve();
           });
         }).catch(() => {});
       }
     })
   );

const fmtDateDDMMYYY = (date) => {
  let d = new Date(date);
  d = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  return moment(d, 'DD/MM/YYYY').format('DD/MM/YYYY');
};

export const fetchAttributeFromDataType = (formName, dataTypeCode, attributeCode) =>
  (dispatch, getState) => (
    new Promise((resolve) => {
      getAttributeFromDataType(dataTypeCode, attributeCode).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            const joinRoles = json.payload.roles ? json.payload.roles.map(role => (role.code)) : [];
            let payload = {
              ...json.payload,
              joinRoles,
              joinAllowedOptions: joinRoles,
              compositeAttributeType: TYPE_COMPOSITE,
            };
            if (json.payload.type === TYPE_DATE) {
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
              payload = {
                ...payload,
                validationRules: {
                  rangeStartDate,
                  rangeEndDate,
                  equalDate,
                  rangeStartDateAttribute,
                  rangeEndDateAttribute,
                  equalDateAttribute,
                },
              };
            }
            const actionMode = getActionModeDataTypeSelectedAttribute(getState());
            if (actionMode !== MODE_ADD_ATTRIBUTE_COMPOSITE) {
              dispatch(initialize(formName, payload));
              dispatch(setSelectedAttributeDataType(json.payload));
              dispatch(fetchDataTypeAttribute(getSelectedAttributeType(getState())));
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

export const sendPostAttributeFromDataType = (
  attributeObject,
  entityCode,
) => (dispatch, getState) => (
  new Promise((resolve) => {
    const list = getDataTypeSelectedAttributeType(getState());
    postAttributeFromDataType(entityCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          history.push(routeConverter(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode,
            attributeCode: attributeObject.code,
          }));
        } else {
          history.push(routeConverter(
            ROUTE_DATA_TYPE_EDIT,
            { datatypeCode: entityCode },
          ));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutAttributeFromDataType = (
  attributeObject,
  entityCode,
) => (dispatch, getState) => (
  new Promise((resolve) => {
    putAttributeFromDataType(entityCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (json.payload.type === TYPE_MONOLIST &&
          !getIsMonolistComposteAttributeType(getState())
        ) {
          history.push(routeConverter(
            ROUTE_ATTRIBUTE_MONOLIST_ADD,
            {
              entityCode,
              attributeCode: attributeObject.code,
            },
          ));
        } else {
          dispatch(setSelectedAttributeDataType(json.payload));
          const { type, code } = attributeObject;
          if (type === TYPE_COMPOSITE) {
            dispatch(initialize('attribute', { ...json.payload, compositeAttributeType: TYPE_COMPOSITE }));
            history.push(routeConverter(
              ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
              { entityCode, attributeCode: code },
            ));
          } else {
            history.push(routeConverter(ROUTE_DATA_TYPE_EDIT, { datatypeCode: entityCode }));
          }
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutAttributeFromDataTypeMonolist = (attributeObject, entityCode) => dispatch => (
  new Promise((resolve) => {
    putAttributeFromDataType(entityCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          history.push(routeConverter(
            ROUTE_DATA_TYPE_EDIT,
            { datatypeCode: entityCode },
          ));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

const converDate = date => `${date.split('/').reverse().join('-')} 00:00:00`;

const getPayloadFromTypeAttribute = (values, allowedRoles) => {
  let payload = {
    ...values,
    code: values.code,
    type: values.type,
    roles: values.joinRoles ? values.joinRoles.map(roleId => (
      { code: roleId, descr: allowedRoles[roleId] }
    )) : [],
    nestedAttribute: {
      ...values.nestedAttribute,
      type: values.listNestedType || (values.nestedAttribute && values.nestedAttribute.type),
      code: values.code,
      enumeratorStaticItems: 'default',
      enumeratorStaticItemsSeparator: ',',
    },
  };
  if (payload.type === TYPE_DATE) {
    const validationRules = {};
    if (payload.validationRules) {
      const {
        rangeStartDate, rangeEndDate, equalDate,
        rangeStartDateAttribute, rangeEndDateAttribute, equalDateAttribute,
      } = payload.validationRules;

      validationRules.rangeStartDate = rangeStartDate && converDate(rangeStartDate);
      validationRules.rangeEndDate = rangeEndDate && converDate(rangeEndDate);
      validationRules.equalDate = equalDate && converDate(equalDate);
      validationRules.rangeStartDateAttribute =
        rangeStartDateAttribute && converDate(rangeStartDateAttribute);
      validationRules.rangeEndDateAttribute =
        rangeEndDateAttribute && converDate(rangeEndDateAttribute);
      validationRules.equalDateAttribute = equalDateAttribute && converDate(equalDateAttribute);
    }
    payload = {
      ...payload,
      validationRules,
    };
  }
  return payload;
};

const getPayloadFromTypeAttributeComposite = (composite, childAttribute) => ({
  ...composite,
  compositeAttributes: [childAttribute],
});

const getPayloadFromTypeMonolistAttributeComposite = (composite, childAttribute) => ({
  ...composite,
  nestedAttribute: {
    ...composite.nestedAttribute,
    compositeAttributes: [childAttribute],
  },
});

export const handlerAttributeFromDataType = (
  action,
  values,
  allowedRoles,
  mode,
  entityCode,
) =>
  (dispatch, getState) => {
    let payload = getPayloadFromTypeAttribute(values, allowedRoles);
    const isMonolistComposite =
      payload.type === TYPE_MONOLIST && payload.nestedAttribute.type === TYPE_COMPOSITE;

    if (action === METHODS.POST) {
      dispatch(setActionMode(MODE_ADD));
      const attributeSelected = getAttributeSelectFromDataType(getState()) || '';
      if (attributeSelected.type === TYPE_COMPOSITE) {
        attributeSelected.compositeAttributes.push(payload);
        dispatch(setActionMode(MODE_ADD_COMPOSITE));
        dispatch(sendPutAttributeFromDataType(attributeSelected, entityCode));
      } else if (payload.type === TYPE_COMPOSITE || isMonolistComposite) {
        dispatch(setActionMode(MODE_ADD_COMPOSITE));
        dispatch(setNewAttributeComposite(payload));
        if (isMonolistComposite) {
          dispatch(setActionMode(MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE));
          history.push(routeConverter(
            ROUTE_ATTRIBUTE_MONOLIST_ADD,
            { entityCode, attributeCode: payload.code },
          ));
        }
      } else {
        const newAttributeComposite = getNewAttributeComposite(getState());
        if (!isUndefined(newAttributeComposite)) {
          payload = getPayloadFromTypeAttributeComposite(newAttributeComposite, payload);
        }
        if (mode === MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE) {
          payload = getPayloadFromTypeMonolistAttributeComposite(
            newAttributeComposite,
            getPayloadFromTypeAttribute(values, allowedRoles),
          );
        }
        dispatch(sendPostAttributeFromDataType(payload, entityCode));
      }
    } else {
      dispatch(setActionMode(MODE_EDIT));
      const isComposite =
        values.type === TYPE_COMPOSITE || payload.type === TYPE_COMPOSITE || isMonolistComposite;
      if (isComposite) {
        if (mode === MODE_EDIT_COMPOSITE) {
          dispatch(sendPutAttributeFromDataType(payload, entityCode)).then(() => {
            history.push(ROUTE_DATA_TYPE_LIST);
          });
        }
        dispatch(setActionMode(MODE_EDIT_COMPOSITE));
      } else {
        if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
          const compositeData = getAttributeSelectFromDataType(getState());
          if (getIsMonolistComposteAttributeType(getState())) {
            compositeData.nestedAttribute.compositeAttributes.push(payload);
          } else {
            compositeData.compositeAttributes.push(payload);
          }
          payload = compositeData;
          dispatch(setActionMode(MODE_EDIT_COMPOSITE));
        }
        dispatch(sendPutAttributeFromDataType(payload, entityCode));
      }
    }
  };

export const sendDeleteAttributeFromDataType = attributeCode => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getSelectedDataType(getState()).code;
    deleteAttributeFromDataType(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(dataTypeCode, attributeCode));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDataTypeAttributes = (page = { page: 1, pageSize: 0 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('dataTypes'));
    getDataTypeAttributes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const list = getDataTypeAttributesIdList(getState());
          if (!list || list.length === 0) {
            dispatch(setDataTypeAttributes(json.payload));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('dataTypes'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendMoveAttributeUp = ({ entityCode, attributeCode, attributeIndex }) => dispatch => (
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
