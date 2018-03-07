import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/common/form/ErrorsAlertContainer';
import { CLEAR_ERRORS } from 'state/errors/types';

const ERRORS = [
  'Error message 1',
  'Error message 2',
];

const STATE = {
  errors: ERRORS,
};

const dispatchMock = jest.fn();

describe('ErrorsAlertContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(STATE);
    });
    it('maps messages property with state.errors', () => {
      expect(props.messages).toEqual(ERRORS);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('maps onDismiss property', () => {
      expect(props.onDismiss).toBeDefined();
    });
    it('onDismiss property dispatches clearErrors', () => {
      props.onDismiss();
      expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({
        type: CLEAR_ERRORS,
      }));
    });
  });
});
