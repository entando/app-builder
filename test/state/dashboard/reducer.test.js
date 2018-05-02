import reducer from 'state/dashboard/reducer';
import { setApis, setPlugins } from 'state/dashboard/actions';


describe('state/dashboard/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('integration');
  });
});
