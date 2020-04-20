import { LIST_ECR_COMPONENTS_OK, COMPONENT_INSTALLATION_IN_PROGRESS } from 'test/mocks/component-repository/components';
import {
  getECRComponents, getECRComponentSelected,
  getECRComponentList, getECRComponentInstallationStatus,
  getECRComponentUninstallStatus,
} from 'state/component-repository/components/selectors';
import { ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS } from 'state/component-repository/components/const';

const list = LIST_ECR_COMPONENTS_OK;
const installation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
};

const uninstallation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
};

const MOCK_STATE = {
  componentRepositoryComponents: {
    list,
    selected: list[0],
    installation,
    uninstallation,
  },
};

describe('state/component-repository/components/selectors', () => {
  it('getECRComponents(state) returns the componentRepositoryComponents object', () => {
    const componentRepositoryComponents = getECRComponents(MOCK_STATE);
    expect(componentRepositoryComponents).toBe(MOCK_STATE.componentRepositoryComponents);
  });

  it('getECRComponentSelected(state) returns the selected object', () => {
    const selected = getECRComponentSelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.componentRepositoryComponents.selected);
  });

  it('verify getECRComponentList selector', () => {
    expect(getECRComponentList(MOCK_STATE)).toEqual(MOCK_STATE.componentRepositoryComponents.list);
  });

  it('verify getECRComponentInstallationStatus selector', () => {
    const props = {
      component: {
        id: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
      },
    };
    const installationStatus = getECRComponentInstallationStatus(MOCK_STATE, props);
    expect(installationStatus).toEqual(ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
  });

  it('verify getECRComponentUninstallStatus selector', () => {
    const props = {
      component: {
        id: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
      },
    };
    const uninstallStatus = getECRComponentUninstallStatus(MOCK_STATE, props);
    expect(uninstallStatus).toEqual(ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
  });
});
