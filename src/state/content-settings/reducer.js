import {
  SET_CONTENT_SETTINGS,
  SET_EDITOR_SETTINGS,
  SET_CROP_RATIOS,
  SET_METADATA_MAPPING,
} from 'state/content-settings/types';

const initialState = {
  cropRatios: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONTENT_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_EDITOR_SETTINGS:
      return {
        ...state,
        editor: action.payload,
      };
    case SET_CROP_RATIOS:
      return {
        ...state,
        cropRatios: action.payload,
      };
    case SET_METADATA_MAPPING:
      return {
        ...state,
        metadata: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
