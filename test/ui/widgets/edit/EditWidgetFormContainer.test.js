import 'test/enzyme-init';

import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/widgets/edit/EditWidgetFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { filterWidgetList } from 'state/page-config/selectors';
import { getSelectedWidgetDefaultUi } from 'state/widgets/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

const GROUP = {
  code: '1',
  name: 'test',
};
const TEST_STATE = {
  mode: 'edit',
  groups: [GROUP],
};

const ownProps = {
  match: {
    params: {
      widgetCode: 'widgetCode',
    },
  },
};

const dispatchMock = jest.fn();

jest.mock('state/page-config/selectors', () => ({
  filterWidgetList: jest.fn(),
}));

filterWidgetList.mockReturnValue([]);

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

getGroupsList.mockReturnValue([GROUP]);

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidgetDefaultUi: jest.fn(),
}));

getSelectedWidgetDefaultUi.mockReturnValue('');

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn(),
}));

getActiveLanguages.mockReturnValue(LANGUAGES);

describe('EditWidgetFormContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps(TEST_STATE);
    });

    it('maps groups and mode property state in WidgetForm', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('groups', [GROUP]);
      expect(props).toHaveProperty('defaultUIField');
      expect(props).toHaveProperty('languages', LANGUAGES);
    });
  });

  describe('mapDispatchToProps', () => {
    it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
      const result = mapDispatchToProps(dispatchMock, ownProps);
      expect(result.onWillMount).toBeDefined();
      result.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
