import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/groups/edit/EditFormContainer';

jest.mock('state/groups/actions', () => ({
  sendPutGroup: jest.fn().mockReturnValue('sendPutGroup_result'),
  fetchGroup: jest.fn().mockReturnValue('fetchGroup_result'),
}));

const dispatchMock = jest.fn();

const TEST_STATE = {
  mode: 'edit',
  form: {
    group: '',
  },
};

const ownProps = {
  match: {
    params: {
      groupCode: 'group_code',
    },
  },
};

describe('EditFormContainer', () => {
  describe('mapStateToProps', () => {
    it('maps groupCode property state in GroupForm', () => {
      const props = mapStateToProps(TEST_STATE, ownProps);
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('groupCode', 'group_code');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('verify that the "onSubmit" is defined by and dispatch sendPutGroup', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPutGroup_result');
    });

    it('verify that "onWillMount" is defined by and dispatch fetchGroup', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount({ groupCode: 'group_code' });
      expect(dispatchMock).toHaveBeenCalledWith('fetchGroup_result');
    });
  });
});
