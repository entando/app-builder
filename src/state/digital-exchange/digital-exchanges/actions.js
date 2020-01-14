import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { formattedText } from '@entando/utils';
import { toggleLoading } from 'state/loading/actions';

import {
  SET_DIGITAL_EXCHANGES,
  SET_SELECTED_DIGITAL_EXCHANGE,
  REMOVE_DIGITAL_EXCHANGE,
} from 'state/digital-exchange/digital-exchanges/types';
import {
  getDigitalExchanges,
  getDigitalExchange,
  postDigitalExchange,
  putDigitalExchange,
  deleteDigitalExchange,
} from 'api/digital-exchange/digitalExchanges';
import { setPage } from 'state/pagination/actions';
import { history, ROUTE_DE_CONFIG_LIST } from 'app-init/router';


export const setSelectedDigitalExchange = digitalExchange => ({
  type: SET_SELECTED_DIGITAL_EXCHANGE,
  payload: {
    digitalExchange,
  },
});

export const setDigitalExchanges = digitalExchanges => ({
  type: SET_DIGITAL_EXCHANGES,
  payload: {
    digitalExchanges,
  },
});

export const removeDigitalExchange = digitalExchange => ({
  type: REMOVE_DIGITAL_EXCHANGE,
  payload: {
    digitalExchange,
  },
});

export const fetchDigitalExchanges = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/list'));
    getDigitalExchanges(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDigitalExchanges(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('digital-exchange/list'));
        resolve();
      });
    }).catch(() => {
      dispatch(toggleLoading('digital-exchange/list'));
    });
  })
);

export const fetchDigitalExchange = (id, initForm = false) => dispatch => (
  new Promise((resolve) => {
    getDigitalExchange(id).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelectedDigitalExchange(data.payload));
          if (initForm) {
            dispatch(initialize('deSettings', data.payload));
          }
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendDeleteDigitalExchange = marketplace => dispatch => (
  new Promise((resolve) => {
    deleteDigitalExchange(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removeDigitalExchange(marketplace));
          dispatch(addToast(
            formattedText('app.deleted', null, { type: 'digital exchange', code: null }),
            TOAST_SUCCESS,
          ));
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPostDigitalExchange = marketplace => dispatch => (
  new Promise((resolve) => {
    postDigitalExchange(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            formattedText('app.created', null, { type: 'digital exchange', code: data.payload.name }),
            TOAST_SUCCESS,
          ));
          history.push(ROUTE_DE_CONFIG_LIST);
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutDigitalExchange = marketplace => dispatch => (
  new Promise((resolve) => {
    putDigitalExchange(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            formattedText('app.updated', null, { type: 'digital exchange', code: data.payload.name }),
            TOAST_SUCCESS,
          ));
          history.push(ROUTE_DE_CONFIG_LIST);
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
