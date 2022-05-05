import { getMfeConfigList, getMfeTargetContent, getMfeTargetPrimaryMenu } from 'state/mfe/selectors';
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
    expect(bundles).toBe(MOCK_STATE.mfe.mfeList[2]);
  });

  it('getMfeTargetPrimaryMenu(state) returns the correct mfe', () => {
    const bundles = getMfeTargetPrimaryMenu(MOCK_STATE);
    expect(bundles).toBe(MOCK_STATE.mfe.mfeList[1]);
  });
});
