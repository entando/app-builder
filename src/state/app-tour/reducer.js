import {
  SET_APP_TOUR_PROGRESS, SET_APP_TOUR_LAST_STEP,
  CLEAR_APP_TOUR_PROGRESS, SET_TOUR_CREATED_PAGE,
  SET_PUBLISH_STATUS, SET_WIZARD_ENABLED,
  SET_EXISTING_PAGES,
} from 'state/app-tour/types';
import { APP_TOUR_STARTED } from './const';

const appTour = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_APP_TOUR_PROGRESS: {
      return {
        ...state,
        appTourProgress: action.payload,
      };
    }
    case SET_APP_TOUR_LAST_STEP: {
      if (state.appTourProgress !== APP_TOUR_STARTED) return state;
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
    case SET_PUBLISH_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case SET_WIZARD_ENABLED: {
      return {
        ...state,
        wizardEnabled: action.payload,
      };
    }
    case SET_EXISTING_PAGES: {
      return {
        ...state,
        existingPages: action.payload,
      };
    }
    case CLEAR_APP_TOUR_PROGRESS: {
      return {};
    }
    default: return state;
  }
};

export default appTour;
