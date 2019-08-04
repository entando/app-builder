import { routeConverter } from 'helpers/routeConverter';

describe('routeConverter', () => {
  it('return the given route if no params is being given', () => {
    expect(routeConverter('/testing')).toBe('/testing');
  });

  it('returns the given route if no replacement can take place', () => {
    expect(routeConverter('/testing', { a: 'b' })).toBe('/testing');
  });

  it('replaces the matching params', () => {
    expect(routeConverter('/testing/:a', { a: 'b' })).toBe('/testing/b');
  });

  it('replaces more than one matching params', () => {
    expect(routeConverter('/testing/:a/:c', { a: 'b', c: 'd' })).toBe('/testing/b/d');
  });
});
