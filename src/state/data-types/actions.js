import { gotoRoute } from 'frontend-common-components';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { addErrors } from 'state/errors/actions';

import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';

import {
  postDataType,
  putDataType,
  deleteDataType,
  deleteAttributeFromDataType,
  getAttributeFromDataType,
  postAttributeFromDataType,
  putAttributeFromDataType,
  getDataTypes,
  getDataTypeAttributes,
  getDataTypeAttribute,
} from 'api/dataTypes';
import {
  SET_DATA_TYPES,
  REMOVE_DATA_TYPE,
  REMOVE_ATTRIBUTE,
  SET_ATTRIBUTES,
  SET_SELECTED_DATA_TYPE,
  SET_SELECTED_ATTRIBUTE,
}
  from 'state/data-types/types';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';

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

export const setSelectedDataType = dataTypeCode => ({
  type: SET_SELECTED_DATA_TYPE,
  payload: {
    dataTypeCode,
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
export const setSelectedAttribute = dataTypeAttributeCode => ({
  type: SET_SELECTED_ATTRIBUTE,
  payload: {
    dataTypeAttributeCode,
  },
});

export const setDataTypeAttributes = attributes => ({
  type: SET_ATTRIBUTES,
  payload: {
    attributes,
  },
});


// thunk

export const sendPostDataType = dataTypeObject => dispatch =>
  new Promise((resolve) => {
    postDataType(dataTypeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_MODEL_LIST);
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
          gotoRoute(ROUTE_DATA_MODEL_LIST);
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
          gotoRoute(ROUTE_DATA_MODEL_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const fetchDataTypes = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('dataTypes'));
    getDataTypes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDataTypes(json.payload));
          dispatch(toggleLoading('dataTypes'));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(toggleLoading('dataTypes'));
        }
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
          dispatch(setSelectedDataType(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);


export const sendPostAttributeFromDataType = (dataTypeCode, attributeObject) => dispatch => (
  new Promise((resolve) => {
    postAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_MODEL_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const sendPutAttributeFromDataType = (dataTypeCode, attributeObject) => dispatch => (
  new Promise((resolve) => {
    putAttributeFromDataType(dataTypeCode, attributeObject).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          gotoRoute(ROUTE_DATA_MODEL_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
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
          gotoRoute(ROUTE_DATA_MODEL_LIST);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);


export const fetchDataTypeAttributes = (page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    getDataTypeAttributes(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const list = getDataTypeAttributesIdList(getState());
          if (!list || list.length === 0) {
            dispatch(setDataTypeAttributes(json.payload));
          }
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const fetchDataTypeAttribute = dataTypeAttributeCode => dispatch => (
  new Promise((resolve) => {
    getDataTypeAttribute(dataTypeAttributeCode).then((response) => {
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
