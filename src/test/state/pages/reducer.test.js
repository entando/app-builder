import reducer from 'state/pages/reducer';


describe('state/pages/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });
});
