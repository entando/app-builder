import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import {
  getECRComponentLastInstallStatus,
  getECRComponentInstallationStatus,
  getECRComponentUninstallStatus,
} from 'state/component-repository/components/selectors';
import { ECR_COMPONENTS_INSTALLATION_PROGRESS } from 'state/component-repository/components/const';
import { COMPONENT_INSTALLATION_IN_PROGRESS } from 'test/mocks/component-repository/components';

const dispatchMock = jest.fn();

const installation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: { state: ECR_COMPONENTS_INSTALLATION_PROGRESS },
};

const uninstallation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: { state: ECR_COMPONENTS_INSTALLATION_PROGRESS },
};

const MOCK_STATE = {
  componentRepositoryComponents: {
    installation,
    uninstallation,
  },
  loading: {
    [`deComponentInstallUninstall-${COMPONENT_INSTALLATION_IN_PROGRESS.componentId}`]: false,
  },
};

const MOCK_PROPS = {
  component: {
    code: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
  },
};

describe('ComponentInstallActionsContainer', () => {
  it('mapStateToProps props are correctly defined ', () => {
    expect(mapStateToProps(MOCK_STATE, MOCK_PROPS)).toEqual({
      lastInstallStatus: getECRComponentLastInstallStatus(MOCK_STATE, MOCK_PROPS),
      installationStatus: getECRComponentInstallationStatus(MOCK_STATE, MOCK_PROPS),
      uninstallStatus: getECRComponentUninstallStatus(MOCK_STATE, MOCK_PROPS),
      installUninstallLoading: false,
      componentUsageList: [],
      isConflictVersion: false,
      progress: undefined,
      selectedVersion: '',
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
