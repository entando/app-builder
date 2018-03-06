
import { fetchFragment, fetchFragmentDetail } from 'state/fragments/actions';
import { BODY_OK } from 'test/mocks/fragment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const FRAGMENT_MOCK = BODY_OK.payload;

const FRAGMENT_CODE = 'test_fragment';

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
