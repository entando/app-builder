import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/components/SearchBarContainer';
import { filterBySearch } from 'state/digital-exchange/actions';
import { getLoading } from 'state/loading/selectors';

jest.mock('state/digital-exchange/components/selectors', () => ({
  getDESearchFilter: jest.fn(() => ''),
}));

jest.mock('state/digital-exchange/actions', () => ({
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
    expect(props.clearSearch).toBeDefined();
    expect(props.onSubmit).toBeDefined();
  });

  it('should dispatch an action if onSubmit is called with a keyword', () => {
    const keyword = 'yomama';
    props.onSubmit({ keyword });
    expect(filterBySearch).toHaveBeenCalledWith(keyword);
  });
});
