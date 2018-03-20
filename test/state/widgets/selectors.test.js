import { getListWidget, getWidgets } from 'state/widgets/selectors';

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
  it('getWidgets(state) return the widgets state', () => {
    const result = getWidgets(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.widgets);
  });

  it('getListWidget(state) return array of widget', () => {
    const result = getListWidget(MOCK_STATE);
    expect(result).toEqual([{ code: 'aa' }, { code: 'bb' }]);
  });
});
