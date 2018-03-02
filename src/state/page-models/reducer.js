import { SET_PAGE_MODELS } from 'state/page-models/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_PAGE_MODELS: {
      return action.payload.pageModels;
    }
    default: return state;
  }
};

export default reducer;
