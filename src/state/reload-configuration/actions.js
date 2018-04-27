import { reloadConf } from 'api/reloadConfiguration';
import { addErrors } from 'state/errors/actions';
import { SET_STATUS } from 'state/reload-configuration/types';

export const setStatus = status => ({
  type: SET_STATUS,
  payload: {
    status,
  },
});

// thunk
export const sendReloadConf = () => dispatch =>
  new Promise((resolve) => {
    reloadConf().then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          console.log(data.payload);
          setStatus(data.payload);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });
