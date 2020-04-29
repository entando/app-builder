import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/settings/edit/SettingsEditFormContainer';
import { sendPutComponentRepository, fetchComponentRepository } from 'state/component-repository/component-repositories/actions';

jest.mock('state/component-repository/component-repositories/actions', () => ({
  sendPutComponentRepository: jest.fn(),
  fetchComponentRepository: jest.fn(),
}));

const dispatchMock = jest.fn();

const ownProps = {
  match: {
    params: {
      server: 33,
    },
  },
};

describe('SettingsListContainer', () => {
  describe('mapStateToProps', () => {
    let props = {};

    beforeAll(() => {
      props = mapStateToProps({}, ownProps);
    });

    it('assigns the correct id value', () => {
      expect(props).toHaveProperty('id', 33);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeAll(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount(12);
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchComponentRepository).toHaveBeenCalledWith(12, true);
    });

    it('should dispatch an action if onSubmit is called', () => {
      const data = { id: 11 };
      props.onSubmit(data);
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPutComponentRepository).toHaveBeenCalledWith(data);
    });
  });
});
