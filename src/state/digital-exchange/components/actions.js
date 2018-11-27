import { SET_DE_COMPONENTS, SET_SELECTED_DE_COMPONENT } from 'state/digital-exchange/components/types';
import { addErrors } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';

import { getDEComponent, getDEComponents } from 'api/digital-exchange/components';
import { setPage } from 'state/pagination/actions';


export const setSelectedDEComponent = digitalExchangeComponent => ({
  type: SET_SELECTED_DE_COMPONENT,
  payload: {
    digitalExchangeComponent,
  },
});

export const setDEComponents = digitalExchangeComponents => ({
  type: SET_DE_COMPONENTS,
  payload: {
    digitalExchangeComponents,
  },
});

export const fetchDEComponents = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/components'));
    getDEComponents(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDEComponents(data.payload));
          dispatch(toggleLoading('digital-exchange/components'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('digital-exchange/components'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDEComponentDetail = id => dispatch => (
  new Promise((resolve) => {
    getDEComponent(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedDEComponent(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
