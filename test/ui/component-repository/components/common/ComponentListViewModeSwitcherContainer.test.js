import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/components/common/ComponentListViewModeSwitcherContainer';
import { setECRComponentListViewMode } from 'state/component-repository/components/actions';

const TEST_STATE = {
  componentRepositoryComponents: { viewMode: 'grid-view' },
};

jest.mock('state/component-repository/components/actions', () => ({
  setECRComponentListViewMode: jest.fn(),
}));


const dispatchMock = jest.fn();

describe('ComponentListViewModeSwitcherContainer', () => {
  it('maps componentRepositoryComponents property state in ComponentListViewModeSwitcherContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      viewMode: TEST_STATE.componentRepositoryComponents.componentListViewMode,
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
      expect(setECRComponentListViewMode).toHaveBeenCalled();
    });
  });
});
