import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/component-repository/settings/add/SettingsAddFormContainer';
import { sendPostComponentRepository } from 'state/component-repository/component-repositories/actions';

jest.mock('state/component-repository/component-repositories/actions', () => ({
  sendPostComponentRepository: jest.fn(),
}));


const dispatchMock = jest.fn();

describe('SettingsListContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
    });

    it('should dispatch an action if onSubmit is called', () => {
      const data = { id: 12 };
      props.onSubmit(data);
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPostComponentRepository).toHaveBeenCalledWith(data);
    });
  });
});
