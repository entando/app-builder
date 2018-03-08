import { SET_CONTENT_TOOLBAR } from 'state/page-config/types';

export const setContentToolbar = content => ({
  type: SET_CONTENT_TOOLBAR,
  payload: {
    content,
  },
});

export default setContentToolbar;
