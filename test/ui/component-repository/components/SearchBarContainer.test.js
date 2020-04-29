import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/components/SearchBarContainer';
import { filterBySearch } from 'state/component-repository/actions';
import { getLoading } from 'state/loading/selectors';

jest.mock('state/component-repository/components/selectors', () => ({
  getECRSearchFilter: jest.fn(() => ''),
}));

jest.mock('state/component-repository/actions', () => ({
  filterBySearch: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

const stateMock = jest.fn();
const dispatchMock = jest.fn();

describe('SearchBarContainer', () => {
  let props;
  beforeEach(() => {
    props = {
      ...mapStateToProps(stateMock),
      ...mapDispatchToProps(dispatchMock),
    };
  });

  it('should map the correct state properties on mapStateToProps', () => {
    expect(props.searchTerm).toBeDefined();
  });

  it('should map the correct function properties on mapDispatchToProps', () => {
    expect(props.onSubmit).toBeDefined();
  });

  it('should dispatch an action if onSubmit is called with a keyword', () => {
    const keyword = 'yomama';
    props.onSubmit({ keyword });
    expect(filterBySearch).toHaveBeenCalledWith(keyword);
  });
});
