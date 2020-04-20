import { SET_ECR_CATEGORIES, SET_SELECTED_ECR_CATEGORY } from 'state/component-repository/categories/types';
import { addErrors } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';

import { getECRCategories } from 'api/component-repository/categories';


export const setSelectedECRCategory = componentRepositoryCategory => ({
  type: SET_SELECTED_ECR_CATEGORY,
  payload: {
    componentRepositoryCategory,
  },
});

export const setECRCategories = componentRepositoryCategories => ({
  type: SET_ECR_CATEGORIES,
  payload: {
    componentRepositoryCategories,
  },
});

export const fetchECRCategories = () => dispatch => (
  new Promise((resolve) => {
    const categoryLoading = 'component-repository/categories';
    dispatch(toggleLoading(categoryLoading));
    getECRCategories().then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setECRCategories(data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }

        dispatch(toggleLoading(categoryLoading));
        resolve();
      });
    }).catch(() => {});
  })
);
