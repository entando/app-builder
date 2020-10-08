import {
  SET_APP_TOUR_PROGRESS, SET_APP_TOUR_LAST_STEP,
  CLEAR_APP_TOUR_PROGRESS, SET_TOUR_CREATED_PAGE,
} from 'state/app-tour/types';

const appTour = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_APP_TOUR_PROGRESS: {
      return {
        ...state,
        appTourProgress: action.payload,
      };
    }
    case SET_APP_TOUR_LAST_STEP: {
      return {
        ...state,
        lastStep: action.payload,
      };
    }
    case SET_TOUR_CREATED_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case CLEAR_APP_TOUR_PROGRESS: {
      return {};
    }
    default: return state;
  }
};

export default appTour;
