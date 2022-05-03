import { SET_MFE_CONFIG_LIST, ADD_MFE_CONFIG, UPDATE_MFE_CONFIG } from 'state/mfe/types';

const initialState = {
  mfeList: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MFE_CONFIG_LIST:
      return action.payload;
    case ADD_MFE_CONFIG: {
      return [...state.mfeList, action.payload];
    }
    case UPDATE_MFE_CONFIG: {
      const mfeConfig = action.payload;
      const filteredMfeList = state.mfeList.filter(mfe => mfe.id !== mfeConfig.id);
      return [...filteredMfeList, mfeConfig];
    }

    default: return state;
  }
};

export default reducer;
