import { SET_DIGITAL_EXCHANGES, SET_SELECTED_DIGITAL_EXCHANGE } from 'state/digital-exchange/digital-exchanges/types';
import { addErrors } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';

import { getDigitalExchanges } from 'api/digital-exchange/digitalExchanges';
import { setPage } from 'state/pagination/actions';


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

export const fetchDigitalExchanges = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/digital-exchange'));
    getDigitalExchanges(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDigitalExchanges(data.payload));
          dispatch(toggleLoading('digital-exchange/digital-exchange'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('digital-exchange/digital-exchange'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
