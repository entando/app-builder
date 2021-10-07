import {
  getVersionings,
  getVersioningsIdList,
  getVersioningsMap,
  getSelectedVersioningType,
  getVersioningList,
  getDetailedContentVersion,
  getResourceVersioningList,
  getResourceVersioningsMap,
  getResourceVersioningsIdList,
} from 'state/versioning/selectors';

const versioningSlice = {
  list: [1],
  resourceList: [3],
  map: {
    1: { code: 2 },
  },
  resourceMap: {
    3: { code: 4 },
  },
  selected: 'contents',
  contentVersionDetails: {
    id: 'ART1',
  },
};

const TEST_STATE = {
  versioning: versioningSlice,
};

describe('state/versioning/selectors', () => {
  it('getVersionings(state) returns the versioning object', () => {
    const selected = getVersionings(TEST_STATE);
    expect(selected).toBe(versioningSlice);
  });

  it('verify getVersioningsIdList selector', () => {
    expect(getVersioningsIdList(TEST_STATE))
      .toEqual(versioningSlice.list);
  });

  it('verify getVersioningsMap selector', () => {
    expect(getVersioningsMap(TEST_STATE))
      .toEqual(versioningSlice.map);
  });

  it('verify getSelectedVersioningType selector', () => {
    expect(getSelectedVersioningType(TEST_STATE))
      .toEqual('contents');
  });

  it('verify getDetailedContentVersion selector', () => {
    expect(getDetailedContentVersion(TEST_STATE))
      .toEqual({ id: 'ART1' });
  });

  it('verify getVersioningList returns correct values', () => {
    const versions = getVersioningList(TEST_STATE);
    expect(versions).toEqual([{ code: 2 }]);
  });

  it('verify getVersioningList returns correct values', () => {
    const versions = getResourceVersioningList(TEST_STATE);
    expect(versions).toEqual([{ code: 4 }]);
  });

  it('verify getResourceVersioningsMap selector', () => {
    expect(getResourceVersioningsMap(TEST_STATE))
      .toEqual(versioningSlice.resourceMap);
  });

  it('verify getResourceVersioningsIdList selector', () => {
    expect(getResourceVersioningsIdList(TEST_STATE))
      .toEqual(versioningSlice.resourceList);
  });
});
