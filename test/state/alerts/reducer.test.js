import reducer from 'state/alerts/reducer';
import { addAlert, clearAlert } from 'state/alerts/actions';


describe('state/alerts/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
  });

  it('should define ad empty object', () => {
    expect(INITIAL_STATE).toMatchObject({});
  });

  describe('add Alert', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, addAlert('a', 'test'));
    });

    it('should be passed a valid Object ', () => {
      expect(newState).toMatchObject({ a: 'test' });
    });

    it('add another alert', () => {
      newState = reducer(newState, addAlert('b', 'test2'));
      expect(newState).toMatchObject({ a: 'test' }, { b: 'test2' });
    });
  });

  describe('clear Alert', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, addAlert('a', 'test'));
    });

    it('alert is corrected removed ', () => {
      newState = reducer(newState, clearAlert('a'));
      expect(newState).not.toMatchObject({ a: 'test' });
    });

    it('state is valid if get ad worng id ', () => {
      newState = reducer(newState, clearAlert('b'));
      expect(newState).toMatchObject({ a: 'test' });
    });
  });
});
