
import { createSelector } from 'reselect';


const getForm = state => state.form;


// eslint-disable-next-line
export const getLoginErrorMessage = createSelector(
  [getForm],
  form => form.loginErrorMessage,
);
