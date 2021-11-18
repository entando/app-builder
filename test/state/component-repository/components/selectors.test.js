import {
  LIST_ECR_COMPONENTS_OK,
  COMPONENT_INSTALLATION_IN_PROGRESS,
  COMPONENT_USAGE_LIST,
} from 'test/mocks/component-repository/components';
import {
  getECRComponents, getECRComponentSelected,
  getECRComponentList, getECRComponentInstallationStatus,
  getECRComponentUninstallStatus, getComponentUsageList,
  getInstallUninstallProgress, getECRComponentInstallationVersion,
  getECRComponentInstallationHasConflictingVersion,
} from 'state/component-repository/components/selectors';
import { ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS } from 'state/component-repository/components/const';

const list = LIST_ECR_COMPONENTS_OK;
const installation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  selectedVersion: 'v1.0.0',
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
    usageList: COMPONENT_USAGE_LIST,
    progressStatus: 0.3,
    installConflicts: {
      hasConflictingVersion: true,
    },
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

  it('verify getInstallUninstallProgress selector', () => {
    expect(getInstallUninstallProgress(MOCK_STATE))
      .toEqual(MOCK_STATE.componentRepositoryComponents.progressStatus);
  });

  it('verify getECRComponentInstallationStatus selector', () => {
    const props = {
      component: {
        code: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
      },
    };
    const installationStatus = getECRComponentInstallationStatus(MOCK_STATE, props);
    expect(installationStatus).toEqual(ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
  });

  it('verify getECRComponentUninstallStatus selector', () => {
    const props = {
      component: {
        code: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
      },
    };
    const uninstallStatus = getECRComponentUninstallStatus(MOCK_STATE, props);
    expect(uninstallStatus).toEqual(ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS);
  });

  it('verify getComponentUsageList', () => {
    const usageList = getComponentUsageList(MOCK_STATE);
    expect(usageList).toEqual(MOCK_STATE.componentRepositoryComponents.usageList);
  });

  it('verify getECRComponentInstallationVersion', () => {
    const selectedVersion = getECRComponentInstallationVersion(MOCK_STATE);
    expect(selectedVersion)
      .toEqual(MOCK_STATE.componentRepositoryComponents.installation.selectedVersion);
  });

  it('verify getECRComponentInstallationHasConflictingVersion', () => {
    const hasConflict = getECRComponentInstallationHasConflictingVersion(MOCK_STATE);
    expect(hasConflict)
      .toEqual(MOCK_STATE.componentRepositoryComponents.installConflicts.hasConflictingVersion);
  });
});
