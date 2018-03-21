import reducer from 'state/pagination/reducer';
import { setPage } from 'state/pagination/actions';

let defaultState;

const correctBody = {
  page: 1,
  pageSize: 2,
  lastPage: 3,
  totalItems: 5,
};

describe('pagination reducer', () => {
  it('should return an object', () => {
    defaultState = reducer();
    expect(typeof defaultState).toBe('object');
    expect(defaultState).toHaveProperty('page', 1);
    expect(defaultState).toHaveProperty('pageSize', 10);
    expect(defaultState).toHaveProperty('lastPage', 1);
    expect(defaultState).toHaveProperty('totalItems', 0);
  });

  describe('after action SET_PAGE', () => {
    it('should define page with the correct parameters', () => {
      const state = reducer(defaultState, setPage(correctBody));
      expect(state).toHaveProperty('page', 1);
      expect(state).toHaveProperty('pageSize', 2);
      expect(state).toHaveProperty('lastPage', 3);
      expect(state).toHaveProperty('totalItems', 5);
    });

    describe('page validation', () => {
      it('should not define page with missing page', () => {
        const state = reducer(defaultState, setPage({ totalItems: 5, lastPage: 3, pageSize: 10 }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the page is a not numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          page: '',
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the page is a not a positive number', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          page: 0,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the page not an integer', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          page: 1.4,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the page is greater than lastPage', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          page: 4,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should define page if the page is numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          page: '2',
        }));
        expect(state).toHaveProperty('page', 2);
        expect(state).toHaveProperty('pageSize', 2);
        expect(state).toHaveProperty('lastPage', 3);
        expect(state).toHaveProperty('totalItems', 5);
      });
    });

    describe('totalItems validation', () => {
      it('should not define page with missing totalItems', () => {
        const state = reducer(defaultState, setPage({ page: 1, lastPage: 3, pageSize: 10 }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if totalItems is a not numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          totalItems: '',
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if totalItems is a not a positive number', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          totalItems: -1,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if totalItems not an integer', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          totalItems: 1.4,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should define page if totalItems is numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          totalItems: '10',
        }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 2);
        expect(state).toHaveProperty('lastPage', 3);
        expect(state).toHaveProperty('totalItems', 10);
      });
    });

    describe('pageSize validation', () => {
      it('should not define page with missing pageSize', () => {
        const state = reducer(defaultState, setPage({ totalItems: 5, lastPage: 3, page: 1 }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the pageSize is a not numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          pageSize: '',
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the pageSize is a not a positive number', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          pageSize: -1,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the pageSize not an integer', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          pageSize: 2.3,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should define page if the pageSize is numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          pageSize: '30',
        }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 30);
        expect(state).toHaveProperty('lastPage', 3);
        expect(state).toHaveProperty('totalItems', 5);
      });

      it('should define page if the pageSize is zero', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          pageSize: 0,
        }));
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('pageSize', 0);
        expect(state).toHaveProperty('lastPage', 3);
        expect(state).toHaveProperty('totalItems', 5);
      });
    });

    describe('lastPage validation', () => {
      it('should not define page with missing lastPage', () => {
        const state = reducer(defaultState, setPage({ totalItems: 5, pageSize: 10, page: 1 }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the lastPage is a not numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          lastPage: '',
        }));
        expect(state).toEqual(defaultState);
      });

      it('should not define page if the lastPage not an integer', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          lastPage: 5.5,
        }));
        expect(state).toEqual(defaultState);
      });

      it('should define page if the pageSize is numeric', () => {
        const state = reducer(defaultState, setPage({
          ...correctBody,
          lastPage: '50',
        }));
        expect(state).toHaveProperty('pageSize', 2);
        expect(state).toHaveProperty('lastPage', 50);
        expect(state).toHaveProperty('page', 1);
        expect(state).toHaveProperty('totalItems', 5);
      });
    });
  });
});
