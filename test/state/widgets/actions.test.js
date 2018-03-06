
import { fetchWidget } from 'state/widgets/actions';
import { BODY_OK } from 'test/mocks/widget';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const WIDGET_MOCK = BODY_OK.payload;

const WIDGET_CODE = 'test_widget';

const FORM_MOCK_INITIAL_STATE = {
  form: {},
};

describe('test fetchWidget', () => {
  const store = mockStore(FORM_MOCK_INITIAL_STATE);
  it('action payload contains widget information', (done) => {
    store.dispatch(fetchWidget(WIDGET_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload).toEqual(WIDGET_MOCK);
      done();
    });
  });
});
