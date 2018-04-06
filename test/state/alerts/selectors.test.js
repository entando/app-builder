import { getAlert } from 'state/alerts/selectors';

const STATE = {
  alerts: { id: 'a', type: 'success' },
};
describe('state/alerts/selectors', () => {
  it('getAlter return the alters state', () => {
    expect(getAlert(STATE)).toMatchObject({ id: 'a', type: 'success' });
  });
});
