import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/components/common/ComponentListViewModeSwitcherContainer';
import { setDEComponentListViewMode } from 'state/digital-exchange/components/actions';

const TEST_STATE = {
  digitalExchangeComponents: { viewMode: 'grid-view' },
};

jest.mock('state/digital-exchange/components/actions', () => ({
  setDEComponentListViewMode: jest.fn(),
}));


const dispatchMock = jest.fn();

describe('ComponentListViewModeSwitcherContainer', () => {
  it('maps digitalExchangeComponents property state in ComponentListViewModeSwitcherContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      viewMode: TEST_STATE.digitalExchangeComponents.componentListViewMode,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.changeViewMode).toBeDefined();
    });

    it('should dispatch an action if changeViewMode is called', () => {
      props.changeViewMode('list-view');
      expect(dispatchMock).toHaveBeenCalled();
      expect(setDEComponentListViewMode).toHaveBeenCalled();
    });
  });
});
