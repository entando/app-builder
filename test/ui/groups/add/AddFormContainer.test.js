import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/groups/add/AddFormContainer';
import { DEFAULT_FORM_VALUES } from 'state/groups/const';

jest.mock('state/groups/actions', () => ({
  sendPostGroup: jest.fn().mockReturnValue('sendPostGroup_result'),
}));

const TEST_STATE = {
  initialValues: DEFAULT_FORM_VALUES,
};

const dispatchProps = {
  history: {},
};

describe('AddFormContainer', () => {
  describe('mapStateToProps', () => {
    it('maps state for GroupForm', () => {
      const props = mapStateToProps(TEST_STATE);
      expect(props).toHaveProperty('initialValues', DEFAULT_FORM_VALUES);
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, dispatchProps);
    });

    it('maps the "onSubmit" prop a sendPostGroup dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPostGroup_result');
    });
  });
});
