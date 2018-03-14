import store from 'state/store';
import { config } from 'api/apiManager';
import { setApi } from 'state/api/actions';

config(store);
store.dispatch(setApi({
  domain: process.env.DOMAIN,
  useMocks: process.env.USE_MOCKS,
}));
