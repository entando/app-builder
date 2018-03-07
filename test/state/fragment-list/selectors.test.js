import { getFragmentList } from 'state/fragment-list/selectors';

const fragmentList = [
  {
    code: 'myCode',
  },
];

const TEST_STATE = { fragmentList };

describe('fragment-list selectors', () => {
  it('verify getFragmentList selector', () => {
    expect(getFragmentList(TEST_STATE)).toEqual(fragmentList);
  });
});
