import reducer from 'state/pagination/reducer';
import { setPage } from 'state/pagination/actions';
import { LIST_FRAGMENTS_OK } from 'test/mocks/fragments';

const FRAGMENT_METADATA = LIST_FRAGMENTS_OK.metaData;

let defaultState;

describe('pagination reducer', () => {
  it('should return an object', () => {
    defaultState = reducer();
    expect(typeof defaultState).toBe('object');
    expect(defaultState).toHaveProperty('page');
    expect(defaultState).toHaveProperty('pageSize');
    expect(defaultState).toHaveProperty('lastPage');
  });

  describe('after action SET_PAGE', () => {
    it('should define page with the correct parameters', () => {
      const state = reducer(defaultState, setPage(FRAGMENT_METADATA));
      expect(state).toHaveProperty('page', 1);
      expect(state).toHaveProperty('pageSize', 10);
      expect(state).toHaveProperty('lastPage', 10);
    });

    describe('page validation', () => {
      it('should not define page with missing page', () => {
        const state = reducer(defaultState, setPage({ lastPage: 3, pageSize: 10 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the page is a not numeric', () => {
        const state = reducer(defaultState, setPage({ page: '', lastPage: 3, pageSize: 10 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the page is a not a positive number', () => {
        const state = reducer(defaultState, setPage({ page: 0, lastPage: 3, pageSize: 10 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the page not an integer', () => {
        const state = reducer(defaultState, setPage({ page: 1.4, lastPage: 3, pageSize: 10 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the page is greater than lastPage', () => {
        const state = reducer(defaultState, setPage({ page: 4, lastPage: 3, pageSize: 10 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should define page if the page is numeric', () => {
        const state = reducer(defaultState, setPage({ page: '22', lastPage: 50, pageSize: 10 }));
        expect(state).toHaveProperty('page', 22);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 50);
      });
    });

    describe('pageSize validation', () => {
      it('should not define page with missing pageSize', () => {
        const state = reducer(defaultState, setPage({ lastPage: 3, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the pageSize is a not numeric', () => {
        const state = reducer(defaultState, setPage({ pageSize: '', lastPage: 3, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the pageSize is a not a positive number', () => {
        const state = reducer(defaultState, setPage({ pageSize: -1, lastPage: 3, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the pageSize not an integer', () => {
        const state = reducer(defaultState, setPage({ pageSize: 2.3, lastPage: 3, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should define page if the pageSize is numeric', () => {
        const state = reducer(defaultState, setPage({ pageSize: '10', lastPage: 50, page: 22 }));
        expect(state).toHaveProperty('page', 22);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 50);
      });

      it('should define page if the pageSize is zero', () => {
        const state = reducer(defaultState, setPage({ pageSize: 0, lastPage: 50, page: 22 }));
        expect(state).toHaveProperty('page', 22);
        expect(state).toHaveProperty('pageSize', 0);
        expect(state).toHaveProperty('lastPage', 50);
      });
    });

    describe('lastPage validation', () => {
      it('should not define page with missing lastPage', () => {
        const state = reducer(defaultState, setPage({ pageSize: 10, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the lastPage is a not numeric', () => {
        const state = reducer(defaultState, setPage({ lastPage: '', pageSize: 10, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should not define page if the lastPage not an integer', () => {
        const state = reducer(defaultState, setPage({ lastPage: 5.5, pageSize: 10, page: 1 }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 1);
      });

      it('should define page if the pageSize is numeric', () => {
        const state = reducer(defaultState, setPage({ lastPage: '50', pageSize: 10, page: 22 }));
        expect(state).toHaveProperty('page', 22);
        expect(state).toHaveProperty('pageSize', 10);
        expect(state).toHaveProperty('lastPage', 50);
      });
    });
  });
});
