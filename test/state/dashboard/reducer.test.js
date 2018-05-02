import reducer from 'state/dashboard/reducer';

describe('state/dashboard/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('integration');
    expect(INITIAL_STATE).toHaveProperty('pageStatus');
  });
});
