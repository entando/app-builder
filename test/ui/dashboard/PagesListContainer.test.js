import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/dashboard/PagesListContainer';

const TEST_STATE = {
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 7,
  },
  pages: {
    search: [],
  },
  locale: 'en',
};

describe('PagesListContainer', () => {
  const stateProps = mapStateToProps(TEST_STATE);

  it('maps the pages property', () => {
    expect(stateProps).toHaveProperty('pages', TEST_STATE.pages.search);
  });

  it('maps the page property', () => {
    expect(stateProps).toHaveProperty('page', TEST_STATE.pagination.page);
  });

  it('maps the totalItems property', () => {
    expect(stateProps).toHaveProperty('totalItems', TEST_STATE.pagination.totalItems);
  });

  it('maps the pageSize property', () => {
    expect(stateProps).toHaveProperty('pageSize', TEST_STATE.pagination.pageSize);
  });

  it('maps the language property', () => {
    expect(stateProps).toHaveProperty('language', TEST_STATE.locale);
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onWillMount', expect.any(Function));
    });
  });
});
