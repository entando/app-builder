import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/components/list/ComponentListContainer';
import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import { getLoading } from 'state/loading/selectors';

const TEST_STATE = {
  digitalExchangeComponents: { list: LIST_DE_COMPONENTS_OK },
};

jest.mock('state/digital-exchange/components/actions', () => ({
  fetchDEComponents: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

const dispatchMock = jest.fn();

describe('ComponentListContainer', () => {
  it('maps digitalExchangeComponents property state in ComponentListContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      digitalExchangeComponents: TEST_STATE.digitalExchangeComponents.list,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDEComponents).toHaveBeenCalled();
    });
  });
});
