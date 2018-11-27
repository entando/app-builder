import { SET_DE_MARKETPLACES, SET_SELECTED_DE_MARKETPLACE } from 'state/digital-exchange/marketplaces/types';
import { addErrors } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';

import { getDEMarketplaces } from 'api/digital-exchange/marketplaces';
import { setPage } from 'state/pagination/actions';


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

export const fetchDEMarketplaces = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/marketplaces'));
    getDEMarketplaces(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDEMarketplaces(data.payload));
          dispatch(toggleLoading('digital-exchange/marketplaces'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('digital-exchange/marketplaces'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
