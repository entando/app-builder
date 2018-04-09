import { getAlerts } from 'state/alerts/selectors';

const STATE = {
  alerts: { id: 'a', type: 'success' },
};
describe('state/alerts/selectors', () => {
  it('getAlters return the alters state', () => {
    expect(getAlerts(STATE)).toMatchObject({ id: 'a', type: 'success' });
  });
});
