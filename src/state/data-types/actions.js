import { gotoRoute, getParams } from '@entando/router';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addErrors } from 'state/errors/actions';
import { initialize } from 'redux-form';

import {
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_EDIT,
  ROUTE_ATTRIBUTE_MONOLIST_ADD,
} from 'app-init/router';

import {
  postDataType,
  putDataType,
  deleteDataType,
  getDataType,
  getDataTypes,
  deleteAttributeFromDataType,
  getAttributeFromDataType,
  postAttributeFromDataType,
  putAttributeFromDataType,
  getDataTypeAttributes,
  getDataTypeAttribute,
  moveAttributeUp,
  moveAttributeDown,
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
} from 'state/data-types/types';
import {
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeType,
  getSelectedDataType,
} from 'state/data-types/selectors';

const TYPE_MONOLIST = 'Monolist';

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

export const moveAttributeUpSync = ({ dataTypeCode, attributeCode }) => ({
  type: MOVE_ATTRIBUTE_UP,
  payload: {
    dataTypeCode,
    attributeCode,
  },
});

export const moveAttributeDownSync = ({ dataTypeCode, attributeCode }) => ({
  type: MOVE_ATTRIBUTE_DOWN,
  payload: {
    dataTypeCode,
    attributeCode,
  },
});

// thunk

export const sendPostDataType = dataTypeObject => dispatch =>
  new Promise((resolve) => {
    postDataType(dataTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: json.payload.code });
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
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
          gotoRoute(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendDeleteDataType = dataTypeCode => dispatch =>
  new Promise((resolve) => {
    deleteDataType(dataTypeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeDataType(dataTypeCode));
          gotoRoute(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
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
        }
        resolve();
      });
    });
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
        }
        dispatch(toggleLoading('dataTypes'));
        resolve();
      });
    });
  })
);

export const fetchAttributeFromDataType = (dataTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    getAttributeFromDataType(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttributeDataType(json.payload));
          dispatch(initialize('attribute', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);


export const sendPostAttributeFromDataType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getParams(getState()).entityCode;
    const list = getDataTypeSelectedAttributeType(getState());
    postAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (list) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: dataTypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: dataTypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromDataType = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getParams(getState()).entityCode;
    putAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else if (json.payload.type === TYPE_MONOLIST) {
          gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: dataTypeCode,
            attributeCode: attributeObject.code,
          });
        } else {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: dataTypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromDataTypeMonolist = attributeObject => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getParams(getState()).entityCode;
    putAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (!response.ok) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        } else {
          gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: dataTypeCode });
        }
        resolve();
      });
    });
  })
);

export const sendDeleteAttributeFromDataType = (dataTypeCode, attributeCode) => dispatch => (
  new Promise((resolve) => {
    deleteAttributeFromDataType(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeAttribute(dataTypeCode, attributeCode));
          gotoRoute(ROUTE_DATA_TYPE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
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
        }
        dispatch(toggleLoading('dataTypes'));
        resolve();
      });
    });
  })
);

export const fetchDataTypeAttribute = (dataTypeAttributeCode, route) => dispatch => (
  new Promise((resolve) => {
    getDataTypeAttribute(dataTypeAttributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedAttribute(json.payload));
          if (route) {
            gotoRoute(route);
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const sendMoveAttributeUp = attributeCode => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getSelectedDataType(getState()).code;
    moveAttributeUp(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(moveAttributeUpSync(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const sendMoveAttributeDown = attributeCode => (dispatch, getState) => (
  new Promise((resolve) => {
    const dataTypeCode = getSelectedDataType(getState()).code;
    moveAttributeDown(dataTypeCode, attributeCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(moveAttributeDownSync(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);
