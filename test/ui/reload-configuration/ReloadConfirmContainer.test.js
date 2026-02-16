import 'test/enzyme-init';
import { mapStateToProps } from 'ui/reload-configuration/ReloadConfirmContainer';

const INITIAL_STATE = {
  configuration: {},
};

jest.mock('state/reload-configuration/selectors', () => ({
  getStatus: jest.fn().mockReturnValue('getStatus_result'),
  getPercentage: jest.fn().mockReturnValue(50),
  getInfo: jest.fn().mockReturnValue({ bean1: '', bean2: 'error' }),
  getLoading: jest.fn().mockReturnValue(false),
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

    it('maps percentage property', () => {
      expect(props).toHaveProperty('percentage', 50);
    });

    it('maps info property', () => {
      expect(props).toHaveProperty('info');
      expect(props.info).toEqual({ bean1: '', bean2: 'error' });
    });

    it('maps loading property', () => {
      expect(props).toHaveProperty('loading', false);
    });
  });
});
