import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/groups/add/AddFormContainer';
import { change } from 'redux-form';

jest.mock('state/groups/actions', () => ({
  sendPostGroup: jest.fn().mockReturnValue('sendPostGroup_result'),
}));

jest.mock('redux-form', () => ({
  change: jest.fn().mockReturnValue('change_result'),
  reduxForm: () => () => 'span',
}));

describe('AddFormContainer', () => {
  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onSubmit" prop a sendPostGroup dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPostGroup_result');
    });

    it('verify that onChangeName is defined by mapDispatchToProps', () => {
      expect(props.onChangeName).toBeDefined();
      props.onChangeName('Group Name');
      expect(dispatchMock).toHaveBeenCalledWith('change_result');
      expect(change).toHaveBeenCalledWith('group', 'code', 'group_name');
    });
  });
});
