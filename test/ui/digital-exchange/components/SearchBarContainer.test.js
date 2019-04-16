import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/digital-exchange/components/SearchBarContainer';
import { filterBySearch } from 'state/digital-exchange/actions';
import { getLoading } from 'state/loading/selectors';

jest.mock('state/digital-exchange/actions', () => ({
  filterBySearch: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

const dispatchMock = jest.fn();

describe('SearchBarContainer', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('should map the correct function properties on mapDispatchToProps', () => {
    expect(props.onSubmit).toBeDefined();
  });

  it('should dispatch an action if onSubmit is called with a keyword', () => {
    props.onSubmit('yomama');
    expect(filterBySearch).toHaveBeenCalledWith('yomama');
  });
});
