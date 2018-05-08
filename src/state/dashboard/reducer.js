import { combineReducers } from 'redux';

import integrations from 'state/dashboard/integrations/reducer';
import pageStatus from 'state/dashboard/page-status/reducer';

export default combineReducers({
  integrations,
  pageStatus,
});
