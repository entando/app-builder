import {
  getActiveFilters,
  getAssetsView,
  getFileType,
  getAssetsList,
  getFilteringCategories,
  getPaginationOptions,
  condenseAssetInfo,
  removePixelWord,
  getAssetSearchKeyword,
  getAssetsCount,
  getURLAbsolute,
} from 'state/assets/selectors';
import { ASSET_RESPONSE } from 'test/mocks/assets';

const { versions, metadata } = ASSET_RESPONSE;

const groupdo = { code: 'groupdo', name: 'dodo' };
const groupre = { code: 'groupre', name: 'rere' };

const a = {
  id: 'a',
  name: 'yo',
  group: 'groupdo',
  path: 'test',
  versions,
  metadata,
};
const b = {
  id: 'b',
  name: 'mama',
  group: 'groupre',
  path: 'test',
  versions,
  metadata,
};

const TEST_STATE = {
  apps: {
    cms: {
      assets: {
        assetsCount: {
          image: 10,
          file: 10,
        },
        sort: {},
        assets: ['a', 'b'],
        assetsMap: { a, b },
        language: 'en',
        filteringCategories: [],
        activeFilters: [],
        assetsView: 'list',
        fileType: 'image',
        paginationOptions: {
          page: 1,
        },
        keyword: 'kolokoks',
      },
      categories: {
        map: {},
      },
    },
  },
  api: {
    domain: 'https://localhost:8080/',
  },
  groups: {
    map: {
      groupdo,
      groupre,
    },
  },
};

it('verify condense function', () => {
  const { metadata: met } = ASSET_RESPONSE;
  const dimension = `${removePixelWord(met['Image Width'])}x${removePixelWord(met['Image Height'])} px`;
  const res = condenseAssetInfo(ASSET_RESPONSE, TEST_STATE.api.domain);
  expect(res.versions[0].dimensions).toEqual(dimension);
  expect(res.metadata.dimension).toEqual(dimension);
  expect(res.versions[0].sizetype).toEqual('orig');
  expect(res.metadata.filename).toEqual('temp_a-ping-d0.png');
});


it('verify getActiveFilters selector', () => {
  const activeFilters = getActiveFilters(TEST_STATE);
  expect(activeFilters).toEqual([]);
});

it('verify getAssetsView selector', () => {
  const assetsView = getAssetsView(TEST_STATE);
  expect(assetsView).toEqual('list');
});

it('verify getFileType selector', () => {
  const fileType = getFileType(TEST_STATE);
  expect(fileType).toEqual('image');
});

it('verify getAssetsList selector', () => {
  const assetsList = getAssetsList(TEST_STATE);
  const cA = condenseAssetInfo({ ...a, group: groupdo }, TEST_STATE.api.domain);
  const cB = condenseAssetInfo({ ...b, group: groupre }, TEST_STATE.api.domain);
  const isImg = atype => atype === 'image';
  const addUrls = (ast) => {
    let newAsset = {
      ...ast,
      downloadUrl: isImg(ast.type) ? ast.versions[0].path
        : getURLAbsolute(TEST_STATE.api.domain, ast.path),
      categories: [],
    };
    if (isImg(ast.type)) {
      newAsset = {
        ...newAsset,
        previewUrl: ast.versions[1].path,
        previewLgUrl: ast.versions[3].path,
      };
    }
    return newAsset;
  };
  expect(assetsList).toEqual([
    addUrls(cA),
    addUrls(cB),
  ]);
});
it('verify getFilteringCategories selector', () => {
  const filteringCategories = getFilteringCategories(TEST_STATE);
  expect(filteringCategories).toEqual([]);
});
it('verify getPaginationOptions selector', () => {
  const paginationOptions = getPaginationOptions(TEST_STATE);
  expect(paginationOptions).toEqual({ page: 1 });
});
it('verify getAssetSearchKeyword selector', () => {
  const key = getAssetSearchKeyword(TEST_STATE);
  expect(key).toEqual(TEST_state.assets.keyword);
});
it('verify getAssetsCount selector', () => {
  const ac = getAssetsCount(TEST_STATE);
  expect(ac).toEqual({ image: 10, file: 10 });
});
