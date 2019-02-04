import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/components/common/ComponentInstallActionsContainer';
import { getDEComponentInstallation } from 'state/digital-exchange/components/selectors';
import { DE_COMPONENTS_INSTALLATION_PROGRESS } from 'state/digital-exchange/components/const';
import { COMPONENT_INSTALLATION_IN_PROGRESS } from 'test/mocks/digital-exchange/components';

const dispatchMock = jest.fn();

const installation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: { state: DE_COMPONENTS_INSTALLATION_PROGRESS },
};

const MOCK_STATE = {
  digitalExchangeComponents: {
    installation,
  },
};

const MOCK_PROPS = {
  component: {
    id: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
  },
};

describe('ComponentInstallActionsContainer', () => {
  it('mapStateToProps props are correctly defined ', () => {
    expect(mapStateToProps(MOCK_STATE, MOCK_PROPS)).toEqual({
      installationProgress: getDEComponentInstallation(MOCK_STATE, MOCK_PROPS),
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onInstall).toBeDefined();
      expect(props.onUninstall).toBeDefined();
    });

    it('should dispatch an action if onSave is called', () => {
      props.onInstall();
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onCancel is called', () => {
      props.onUninstall();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
