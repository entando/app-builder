import { getLoading } from 'state/loading/selectors';

const STATE = {
  loading: { test: true },
};
describe('state/loading/selectors', () => {
  it('getLoading return the loading state', () => {
    expect(getLoading(STATE)).toEqual(STATE.loading);
  });
});
