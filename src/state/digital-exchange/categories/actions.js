import { SET_DE_CATEGORIES, SET_SELECTED_DE_CATEGORY } from 'state/digital-exchange/categories/types';
import { addErrors } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';

import { getDECategories } from 'api/digital-exchange/categories';


export const setSelectedDECategory = digitalExchangeCategory => ({
  type: SET_SELECTED_DE_CATEGORY,
  payload: {
    digitalExchangeCategory,
  },
});

export const setDECategories = digitalExchangeCategories => ({
  type: SET_DE_CATEGORIES,
  payload: {
    digitalExchangeCategories,
  },
});

export const fetchDECategories = () => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/categories'));
    getDECategories().then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDECategories(data.payload));
          dispatch(toggleLoading('digital-exchange/categories'));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('digital-exchange/categories'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
