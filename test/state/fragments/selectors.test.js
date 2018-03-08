import { getFragmentList } from 'state/fragments/selectors';

const list = [
  {
    code: 'myCode',
  },
];

const TEST_STATE = { fragments: { list } };

describe('fragment list selectors', () => {
  it('verify getFragmentList selector', () => {
    expect(getFragmentList(TEST_STATE)).toEqual(list);
  });
});
