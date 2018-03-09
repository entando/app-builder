import reducer from 'state/data-models/reducer';

describe('state/data-types/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });
});
