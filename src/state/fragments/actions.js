import getFragmentAPI from 'api/fragment';
import { initialize } from 'redux-form';

// thunks
// eslint-disable-next-line
export const fetchFragment = fragmentCode => dispatch => (
  getFragmentAPI(fragmentCode).then((response) => {
    dispatch(initialize('fragment', response.payload));
  })
);
