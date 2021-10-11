import reducer from 'state/versioning/reducer';
import {
  setVersionings,
  setSelectedVersioningType,
  setDetailedContentVersion,
  setResourceVersionings,
  setVersioningConfig,
} from 'state/versioning/actions';
import {
  getVersioningList, getSelectedVersioningType,
  getDetailedContentVersion, getResourceVersioningList,
} from 'state/versioning/selectors';
import { LIST_VERSIONING_OK, LIST_ATTACHMENTS_OK } from 'test/mocks/versioning';

describe('state/versioning/reducer', () => {
  const state = reducer();

  describe('default state', () => {
    it('should be an object and has required properties', () => {
      expect(typeof state).toBe('object');
      expect(state).toHaveProperty('list');
      expect(state).toHaveProperty('map');
      expect(state).toHaveProperty('selected');
      expect(state).toHaveProperty('versioningConfig');
    });
  });

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setVersionings', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setVersionings(LIST_VERSIONING_OK));
    });

    it('should define the versioning list payload', () => {
      expect(getVersioningList({
        versioning: newState,
      })).toEqual(LIST_VERSIONING_OK);
    });
  });

  describe('after action setResourceVersionings', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setResourceVersionings(LIST_ATTACHMENTS_OK));
    });

    it('should define the versioning list payload', () => {
      expect(getResourceVersioningList({
        versioning: newState,
      })).toEqual(LIST_ATTACHMENTS_OK);
    });
  });

  describe('after action setSelectedVersioningType', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedVersioningType('contents'));
    });

    it('should define the selected versioning type', () => {
      expect(getSelectedVersioningType({ versioning: newState })).toEqual('contents');
    });
  });

  describe('after action setDetailedContentVersion', () => {
    let newState;
    const content = { id: 'ART1' };
    beforeEach(() => {
      newState = reducer(state, setDetailedContentVersion(content));
    });

    it('should define the selected versioning type', () => {
      expect(getDetailedContentVersion({
        versioning: newState,
      })).toEqual(content);
    });
  });

  describe('after action setVersioningConfig', () => {
    let newState;
    const config = { a: 1 };
    beforeEach(() => {
      newState = reducer(state, setVersioningConfig(config));
    });

    it('should define the selected versioning type', () => {
      expect(newState).toHaveProperty('versioningConfig', config);
    });
  });
});
