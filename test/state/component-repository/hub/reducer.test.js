import reducer, { ECR_LOCAL_REGISTRY } from 'state/component-repository/hub/reducer';
import {
  setActiveRegistry,
  setFetchedBundlesFromRegistry,
  setFetchedRegistries,
  setFetchedBundleGroups,
  setBundleStatuses,
  setSelectedBundleStatus,
  setBundleGroupIdFilter,
} from 'state/component-repository/hub/actions';
import {
  LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK,
  LIST_BUNDLE_GROUPS_OK, LIST_BUNDLE_STATUSES_OK,
} from 'test/mocks/component-repository/hub';

const REGISTRY = { name: 'regName', url: 'regUrl' };

describe('component-repository/hub/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setActiveRegistry', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setActiveRegistry(REGISTRY));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('selected', REGISTRY);
    });
  });

  describe('after action setFetchedBundlesFromRegistry', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setFetchedBundlesFromRegistry(LIST_BUNDLES_FROM_REGISTRY_OK));
    });

    it('should define the bundles payload', () => {
      expect(newState).toHaveProperty('bundles', LIST_BUNDLES_FROM_REGISTRY_OK);
    });
  });

  describe('after action setFetchedRegistries', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setFetchedRegistries(LIST_REGISTRIES_OK));
    });

    it('should define the registries payload', () => {
      expect(newState).toHaveProperty('registries', [ECR_LOCAL_REGISTRY, ...LIST_REGISTRIES_OK]);
    });
  });

  describe('after action setFetchedBundleGroups', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setFetchedBundleGroups(LIST_BUNDLE_GROUPS_OK));
    });

    it('should define the bundleGroups payload', () => {
      expect(newState).toHaveProperty('bundleGroups', LIST_BUNDLE_GROUPS_OK);
    });
  });

  describe('after action setBundleStatuses', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setBundleStatuses(LIST_BUNDLE_STATUSES_OK.bundlesStatuses));
    });

    it('should define the bundleGroups payload', () => {
      expect(newState).toHaveProperty('bundleStatuses', LIST_BUNDLE_STATUSES_OK.bundlesStatuses);
    });
  });

  describe('after action setSelectedBundleStatus', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setSelectedBundleStatus(LIST_BUNDLE_STATUSES_OK.bundlesStatuses[0]),
      );
    });

    it('should define the bundleStatus payload', () => {
      expect(newState).toHaveProperty('selectedBundleStatus', LIST_BUNDLE_STATUSES_OK.bundlesStatuses[0]);
    });
  });

  describe('after action setBundleGroupIdFilter', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setBundleGroupIdFilter('filterValue'));
    });

    it('should define the bundleFilters payload', () => {
      expect(newState).toHaveProperty('bundleFilters', { bundleGroupId: 'filterValue' });
    });
  });
});
