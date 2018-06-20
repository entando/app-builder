import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/common/WidgetFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

const GROUP = {
  code: '1',
  name: 'test',
};
const TEST_STATE = {
  groups: [
    GROUP,
  ],

};

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

getGroupsList.mockReturnValue([GROUP]);

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn(),
}));

getActiveLanguages.mockReturnValue(LANGUAGES);

describe('WidgetFormContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps(TEST_STATE);
    });

    it('maps groups property state in WidgetForm', () => {
      expect(props).toHaveProperty('groups', [GROUP]);
      expect(props).toHaveProperty('languages', LANGUAGES);
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(TEST_STATE);
    });

    it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
      const dispatchMock = jest.fn();
      const result = mapDispatchToProps(dispatchMock);
      expect(result.onWillMount).toBeDefined();
      result.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
      expect(result.onSubmit).toBeDefined();
    });
  });
});
