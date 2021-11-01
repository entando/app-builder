import {
  getBundlesFromRegistry,
  getRegistries,
  getSelectedRegistry,
  getBundleGroups,
  getBundleStatuses,
  getSelectedBundleStatus,
  getBundleFilters,
} from 'state/component-repository/hub/selectors';
import { ECR_LOCAL_REGISTRY } from 'state/component-repository/hub/reducer';
import {
  LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK,
  LIST_BUNDLE_GROUPS_OK, LIST_BUNDLE_STATUSES_OK,
} from 'test/mocks/component-repository/hub';

const MOCK_STATE = {
  hub: {
    bundles: LIST_BUNDLES_FROM_REGISTRY_OK,
    selected: ECR_LOCAL_REGISTRY,
    registries: LIST_REGISTRIES_OK,
    bundleGroups: LIST_BUNDLE_GROUPS_OK,
    bundleStatuses: LIST_BUNDLE_STATUSES_OK.bundlesStatuses,
    selectedBundleStatus: LIST_BUNDLE_STATUSES_OK.bundlesStatuses[0],
    bundleFilters: { bundleGroupId: '1' },
  },
};

describe('state/component-repository/hub/selectors', () => {
  it('getBundlesFromRegistry(state) returns the bundles array', () => {
    const bundles = getBundlesFromRegistry(MOCK_STATE);
    expect(bundles).toBe(MOCK_STATE.hub.bundles);
  });

  it('getRegistries(state) returns the registries array', () => {
    const selected = getRegistries(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.hub.registries);
  });

  it('verify getSelectedRegistry selector', () => {
    expect(getSelectedRegistry(MOCK_STATE)).toEqual(ECR_LOCAL_REGISTRY);
  });

  it('verify getBundleGroups selector', () => {
    expect(getBundleGroups(MOCK_STATE))
      .toEqual(MOCK_STATE.hub.bundleGroups);
  });

  it('verify getBundleStatuses selector', () => {
    expect(getBundleStatuses(MOCK_STATE))
      .toEqual(MOCK_STATE.hub.bundleStatuses);
  });

  it('verify getSelectedBundleStatus selector', () => {
    expect(getSelectedBundleStatus(MOCK_STATE))
      .toEqual(MOCK_STATE.hub.selectedBundleStatus);
  });

  it('verify getBundleFilters selector', () => {
    expect(getBundleFilters(MOCK_STATE))
      .toEqual(MOCK_STATE.hub.bundleFilters);
  });
});
