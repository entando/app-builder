import {
  getMfeConfigList, getMfeTargetContent,
  getMfeTargetPrimaryMenu, getMfeByTarget, getMfeById, getMfeTargetPrimaryHeader,
} from 'state/mfe/selectors';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

const MOCK_STATE = {
  mfe: {
    mfeList: LIST_MFE_RESPONSE_OK,
  },
};

describe('state/mfe/selectors', () => {
  it('getBundlesFromRegistry(state) returns the bundles array', () => {
    const bundles = getMfeConfigList(MOCK_STATE);
    expect(bundles).toBe(MOCK_STATE.mfe.mfeList);
  });

  it('getMfeTargetContent(state) returns the correct mfe', () => {
    const bundles = getMfeTargetContent(MOCK_STATE);
    expect(bundles).toEqual([MOCK_STATE.mfe.mfeList[3]]);
  });

  it('getMfeTargetPrimaryMenu(state) returns the correct mfe', () => {
    const bundles = getMfeTargetPrimaryMenu(MOCK_STATE);
    expect(bundles).toEqual(MOCK_STATE.mfe.mfeList[1]);
  });

  it('getMfeTargetPrimaryHeader(state) returns the correct mfe', () => {
    const bundles = getMfeTargetPrimaryHeader(MOCK_STATE);
    expect(bundles).toEqual(MOCK_STATE.mfe.mfeList[0]);
  });

  it('getMfeByTarget(state, "content") returns the correct mfe', () => {
    const bundles = getMfeByTarget(MOCK_STATE, 'content');
    expect(bundles).toEqual([MOCK_STATE.mfe.mfeList[3]]);
  });

  it('getMfeByTarget(state, "primary-header") returns the correct mfe', () => {
    const bundles = getMfeByTarget(MOCK_STATE, 'primary-header');
    expect(bundles).toEqual([MOCK_STATE.mfe.mfeList[0]]);
  });

  it('getMfeById(state, "example-mfe") returns the correct mfe', () => {
    const bundles = getMfeById(MOCK_STATE, 'example-mfe');
    expect(bundles).toEqual(MOCK_STATE.mfe.mfeList[4]);
  });
});
