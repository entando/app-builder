import { getListWidget } from 'state/widgets/selectors';

const MOCK_STATE = {
  widgets: {
    list: ['aa', 'bb'],
    map: {
      aa: {
        code: 'aa',
      },
      bb: {
        code: 'bb',
      },
    },
  },
};

describe('state/widgest/selectors', () => {
  it('getListWidget(state) return array of widget', () => {
    const result = getListWidget(MOCK_STATE);
    expect(result).toEqual([{ code: 'aa' }, { code: 'bb' }]);
  });
});
