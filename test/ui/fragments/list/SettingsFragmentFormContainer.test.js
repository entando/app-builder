import { mapDispatchToProps } from 'ui/fragments/list/SettingsFragmentFormContainer';

import { fetchFragmentSettings, updateFragmentSettings } from 'state/fragments/actions';


const dispatchMock = jest.fn();


jest.mock('state/fragments/actions', () => ({
  fetchFragmentSettings: jest.fn(),
  updateFragmentSettings: jest.fn(),
}));

describe('ui/fragments/list/SettingsFragmentFormContainer', () => {
  let props;

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onSubmit).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchFragmentSettings).toHaveBeenCalled();
    });

    it('should dispatch an action if onSubmit is called', () => {
      props.onSubmit('test');
      expect(dispatchMock).toHaveBeenCalled();
      expect(updateFragmentSettings).toHaveBeenCalledWith('test');
    });
  });
});
