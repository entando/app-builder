import reducer from 'state/dashboard/page-status/reducer';
import { setPageStatus } from 'state/dashboard/actions';


describe('state/dashboard/page-status/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('draft', 0);
    expect(INITIAL_STATE).toHaveProperty('published', 0);
    expect(INITIAL_STATE).toHaveProperty('unpublished', 0);
  });

  describe('after SET_PAGE_STATUS', () => {
    it('new pageStatus value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setPageStatus({
        draft: 1,
        published: 2,
        unpublished: 3,
      }));
      expect(newState).toHaveProperty('draft', 1);
      expect(newState).toHaveProperty('published', 2);
      expect(newState).toHaveProperty('unpublished', 3);
    });
  });
});
