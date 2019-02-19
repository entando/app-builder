import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { toggleLoading } from 'state/loading/actions';

import {
  SET_DE_MARKETPLACES,
  SET_SELECTED_DE_MARKETPLACE,
  REMOVE_DE_MARKETPLACE,
} from 'state/digital-exchange/marketplaces/types';
import {
  getDEMarketplaces,
  getDEMarketplace,
  postDEMarketplaces,
  putDEMarketplaces,
  deleteDEMarketplace,
} from 'api/digital-exchange/marketplaces';
import { setPage } from 'state/pagination/actions';
import { ROUTE_DE_CONFIG_LIST } from 'app-init/router';


export const setSelectedDEMarketplace = digitalExchangeMarketplace => ({
  type: SET_SELECTED_DE_MARKETPLACE,
  payload: {
    digitalExchangeMarketplace,
  },
});

export const setDEMarketplaces = digitalExchangeMarketplaces => ({
  type: SET_DE_MARKETPLACES,
  payload: {
    digitalExchangeMarketplaces,
  },
});

export const removeDEMarketplace = marketplace => ({
  type: REMOVE_DE_MARKETPLACE,
  payload: {
    marketplace,
  },
});

export const fetchDEMarketplaces = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/marketplaces'));
    getDEMarketplaces(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDEMarketplaces(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('digital-exchange/marketplaces'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDEMarketplace = (id, initForm = false) => dispatch => (
  new Promise((resolve) => {
    getDEMarketplace(id).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelectedDEMarketplace(data.payload));
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

export const sendDeleteDEMarketplaces = marketplace => dispatch => (
  new Promise((resolve) => {
    deleteDEMarketplace(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removeDEMarketplace(marketplace));
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

export const sendPostDEMarketplaces = marketplace => dispatch => (
  new Promise((resolve) => {
    postDEMarketplaces(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            formattedText('app.created', null, { type: 'digital exchange', code: data.payload.name }),
            TOAST_SUCCESS,
          ));
          gotoRoute(ROUTE_DE_CONFIG_LIST);
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutDEMarketplaces = marketplace => dispatch => (
  new Promise((resolve) => {
    putDEMarketplaces(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            formattedText('app.updated', null, { type: 'digital exchange', code: data.payload.name }),
            TOAST_SUCCESS,
          ));
          gotoRoute(ROUTE_DE_CONFIG_LIST);
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
