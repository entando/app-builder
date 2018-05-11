import 'test/enzyme-init';
import { mapStateToProps } from 'ui/reload-configuration/ReloadConfirmContainer';

const INITIAL_STATE = {
  configuration: {},
};

jest.mock('state/reload-configuration/selectors', () => ({
  getStatus: jest.fn().mockReturnValue('getStatus_result'),
}));

describe('ReloadConfirmContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(INITIAL_STATE);
    });

    it('maps status property', () => {
      expect(props).toHaveProperty('status', 'getStatus_result');
    });
  });
});
