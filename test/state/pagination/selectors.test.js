import {
  getCurrentPage,
  getLastPage,
  getPageSize,
  isLastPage,
  getNextPage,
  isFirstPage,
  getPreviousPage,
  getTotalItems,
} from 'state/pagination/selectors';

const firstPage = {
  page: 1,
  pageSize: 5,
  lastPage: 10,
  totalItems: 48,
};

const lastPage = {
  page: 10,
  pageSize: 5,
  lastPage: 10,
  totalItems: 48,
};

const middlePage = {
  page: 5,
  pageSize: 5,
  lastPage: 10,
  totalItems: 48,
};

describe('pagination selectors', () => {
  let state;
  let page;

  const setPage = (mockState) => {
    state = { pagination: { global: mockState } };
    page = mockState;
  };

  beforeEach(() => {
    setPage(firstPage);
  });

  it('verify getCurrentPage selector', () => {
    expect(getCurrentPage(state)).toEqual(page.page);
  });

  it('verify getLastPage selector', () => {
    expect(getLastPage(state)).toEqual(page.lastPage);
  });

  it('verify getPageSize selector', () => {
    expect(getPageSize(state)).toEqual(page.pageSize);
  });

  it('verify getTotalItems selector', () => {
    expect(getTotalItems(state)).toEqual(page.totalItems);
  });

  describe('isLastPage', () => {
    it('returns true if current page is the last page', () => {
      setPage(lastPage);
      expect(isLastPage(state)).toBe(true);
    });

    it('returns false if currest page is the first page', () => {
      setPage(firstPage);
      expect(isLastPage(state)).toBe(false);
    });

    it('returns false if currest page is a page in the middle', () => {
      setPage(middlePage);
      expect(isLastPage(state)).toBe(false);
    });
  });

  describe('getNextPage', () => {
    it('returns the next page if the current page is not the last page', () => {
      setPage(middlePage);
      expect(getNextPage(state)).toEqual(page.page + 1);
    });

    it('returns the current page if the current page is the last page', () => {
      setPage(lastPage);
      expect(getNextPage(state)).toEqual(page.page);
    });
  });

  describe('isFirstPage', () => {
    it('returns true if current page is the first page', () => {
      setPage(firstPage);
      expect(isFirstPage(state)).toBe(true);
    });

    it('returns false if currest page is the last page', () => {
      setPage(lastPage);
      expect(isFirstPage(state)).toBe(false);
    });

    it('returns false if currest page is a page in the middle', () => {
      setPage(middlePage);
      expect(isFirstPage(state)).toBe(false);
    });
  });

  describe('getPreviousPage', () => {
    it('returns the previous page if the current page is not the first page', () => {
      setPage(middlePage);
      expect(getPreviousPage(state)).toEqual(page.page - 1);
    });

    it('returns the current page if the current page is the first page', () => {
      setPage(firstPage);
      expect(getPreviousPage(state)).toEqual(page.page);
    });
  });

  describe('access different namespace', () => {
    beforeEach(() => {
      state = {
        pagination: {
          global: state.pagination.global,
          custom: lastPage,
        },
      };
    });

    it('the global namespace is still accessable', () => {
      expect(getCurrentPage(state)).toEqual(firstPage.page);
      expect(getLastPage(state)).toEqual(firstPage.lastPage);
      expect(getPageSize(state)).toEqual(firstPage.pageSize);
      expect(getTotalItems(state)).toEqual(firstPage.totalItems);
    });

    it('can access another existing namespace', () => {
      expect(getCurrentPage(state, 'custom')).toEqual(lastPage.page);
      expect(getLastPage(state, 'custom')).toEqual(lastPage.lastPage);
      expect(getPageSize(state, 'custom')).toEqual(lastPage.pageSize);
      expect(getTotalItems(state, 'custom')).toEqual(lastPage.totalItems);
    });
  });
});
