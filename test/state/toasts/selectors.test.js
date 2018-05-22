import { getToasts } from 'state/toasts/selectors';

const STATE = {
  toasts: {
    a: { message: 'one', type: 'test' },
    b: { message: 'two', type: 'test2' },
  },
};

describe('state/toasts/selectors', () => {
  it('getToasts return the toasts list', () => {
    expect(getToasts(STATE)).toHaveProperty('a', { message: 'one', type: 'test' });
    expect(getToasts(STATE)).toHaveProperty('b', { message: 'two', type: 'test2' });
  });
});
