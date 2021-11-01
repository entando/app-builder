import 'test/enzyme-init';
import {
  NO_PAGE, getBundlesFromRegistry, getRegistries, getBundleGroups,
  deleteRegistry, addRegistry, deployBundle, undeployBundle,
  getBundleStatuses,
} from 'api/component-repository/hub';
import { makeRequest, METHODS } from '@entando/apimanager';
import {
  LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK,
  LIST_BUNDLE_GROUPS_OK, LIST_BUNDLE_STATUSES_OK,
  DEPLOY_BUNDLE_OK, ADD_REGISTRY_OK, DELETE_REGISTRY_OK,
  UNDEPLOY_BUNDLE_OK,
} from 'test/mocks/component-repository/hub';

const DEFAULT_PAGE = {
  page: 1,
  pageSize: 10,
};

jest.unmock('api/component-repository/componentRepositories');
jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/component-repository/hub', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBundlesFromRegistry', () => {
    it('returns a promise', () => {
      expect(getBundlesFromRegistry()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const url = 'http://test.com';
      getBundlesFromRegistry(url);
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/bundles/',
          domain: url,
          method: METHODS.GET,
          mockResponse: LIST_BUNDLES_FROM_REGISTRY_OK,
          useAuthentication: false,
        },
        DEFAULT_PAGE,
      );
    });
  });

  describe('getRegistries', () => {
    it('returns a promise', () => {
      expect(getRegistries()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getRegistries();
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/registries/',
          domain: '/digital-exchange',
          method: METHODS.GET,
          mockResponse: LIST_REGISTRIES_OK,
          useAuthentication: true,
        },
        NO_PAGE,
      );
    });
  });

  describe('getBundleGroups', () => {
    it('returns a promise', () => {
      expect(getBundleGroups()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const url = 'http://test.com';
      getBundleGroups(url);
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/bundlegroups/',
          domain: url,
          method: METHODS.GET,
          mockResponse: LIST_BUNDLE_GROUPS_OK,
          useAuthentication: false,
        },
        DEFAULT_PAGE,
      );
    });
  });

  describe('deleteRegistry', () => {
    it('returns a promise', () => {
      expect(deleteRegistry()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const registryId = 'registryId-testId';
      deleteRegistry(registryId);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/registries/${registryId}`,
        domain: '/digital-exchange',
        method: METHODS.DELETE,
        mockResponse: DELETE_REGISTRY_OK,
        useAuthentication: true,
      });
    });
  });


  describe('addRegistry', () => {
    it('returns a promise', () => {
      expect(addRegistry()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const registryObject = { name: 'test name', url: 'http://test.com' };
      addRegistry(registryObject);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/registries',
        domain: '/digital-exchange',
        method: METHODS.POST,
        mockResponse: ADD_REGISTRY_OK,
        useAuthentication: true,
        body: registryObject,
      });
    });
  });

  describe('deployBundle', () => {
    it('returns a promise', () => {
      expect(deployBundle()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const bundle = { name: 'test name', gitRepoAddress: 'http://test.com' };
      deployBundle(bundle);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/components',
        domain: '/digital-exchange',
        method: METHODS.POST,
        mockResponse: DEPLOY_BUNDLE_OK,
        useAuthentication: true,
        body: bundle,
      });
    });
  });

  describe('undeployBundle', () => {
    it('returns a promise', () => {
      expect(undeployBundle()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const bundleId = 'bundle-id';
      undeployBundle(bundleId);
      expect(makeRequest).toHaveBeenCalledWith({
        uri: `/components/${bundleId}`,
        domain: '/digital-exchange',
        method: METHODS.DELETE,
        mockResponse: UNDEPLOY_BUNDLE_OK,
        useAuthentication: true,
      });
    });
  });

  describe('getBundleStatuses', () => {
    it('returns a promise', () => {
      expect(getBundleStatuses()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      const bundleIds = ['bundle-id1'];
      getBundleStatuses(bundleIds);
      expect(makeRequest).toHaveBeenCalledWith(
        {
          uri: '/components/status/query',
          domain: '/digital-exchange',
          method: METHODS.POST,
          mockResponse: LIST_BUNDLE_STATUSES_OK,
          useAuthentication: true,
          body: {
            ids: bundleIds,
          },
        },
        NO_PAGE,
      );
    });
  });
});
