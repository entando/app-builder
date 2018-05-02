import { combineReducers } from 'redux';

import integration from 'state/dashboard/integrations/reducer';
import pageStatus from 'state/dashboard/page-status/reducer';

export default combineReducers({
  integration,
  pageStatus,
});
