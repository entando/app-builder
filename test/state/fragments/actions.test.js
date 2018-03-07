import { fetchFragment, fetchFragmentDetail } from 'state/fragments/actions';
import { GET_FRAGMENT_OK } from 'test/mocks/fragments';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const FRAGMENT_MOCK = GET_FRAGMENT_OK.payload;

const FRAGMENT_CODE = 'myCode';

const FORM_MOCK_INITIAL_STATE = {
  form: {},
};


describe('test fetchFragment', () => {
  const store = mockStore(FORM_MOCK_INITIAL_STATE);
  it('action payload contains fragment information', (done) => {
    store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual(FRAGMENT_MOCK);
      done();
    });
  });

  it('action payload contains fragment information', (done) => {
    store.dispatch(fetchFragmentDetail(FRAGMENT_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual(FRAGMENT_MOCK);
      done();
    });
  });
});
