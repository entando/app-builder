import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/groups/add/AddFormContainer';
import { change, touch } from 'redux-form';

jest.mock('state/groups/actions', () => ({
  sendPostGroup: jest.fn().mockReturnValue('sendPostGroup_result'),
}));

const dispatchProps = {
  history: {},
};

describe('AddFormContainer', () => {
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

    it('verify that onChangeName is defined by mapDispatchToProps', () => {
      expect(props.onChangeName).toBeDefined();
      props.onChangeName('Group Name');
      expect(change).toHaveBeenCalledWith('group', 'code', 'group_name');
      expect(touch).toHaveBeenCalledWith('group', 'code');
    });

    it('verify that onFocus is defined by mapDispatchToProps', () => {
      expect(props.onFocus).toBeDefined();
      props.onFocus('code');
      expect(touch).toHaveBeenCalledWith('group', 'code');
    });
  });
});
