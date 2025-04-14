import 'test/enzyme-init';

import { mapStateToProps } from 'ui/widgets/edit/EditWidgetPageContainer';

// mocked
import { returnedFuncMock } from 'redux-form';

const LANGUAGES_MAP = {
  it: {
    code: 'it',
    description: 'Italiano',
    isActive: true,
    isDefault: false,
  },
  en: {
    code: 'en',
    description: 'English',
    isActive: true,
    isDefault: true,
  },
};
const LANGUAGES_LIST = [
  'it',
  'en',
];

const TEST_STATE = {
  mode: 'edit',
  widgets: {
    selected: {
      code: 'test_widget',
      name: 'Test Widget',
      used: 0,
      titles: {
        it: 'Widget di Test',
        en: 'Test Widget',
      },
      group: 'group',
      customUi: '<p>Custom UI</p>',
      defaultUi: '<p>Default UI</p>',
      createdAt: '2018/02/22',
      updatedAt: '2018/02/22',
    },
  },
  languages: {
    map: LANGUAGES_MAP,
    list: LANGUAGES_LIST,
  },
};

const ownProps = {
  match: {
    params: {
      widgetCode: 'code',
    },
  },
};

describe('EditWidgetPageContainer', () => {
  describe('mapStateToProps', () => {
    it('map widgetName property state in WidgetEditPage', () => {
      returnedFuncMock.mockReturnValue('Test Widget');
      expect(mapStateToProps(TEST_STATE, ownProps)).toEqual({ widgetName: 'Test Widget' });
    });
  });
});
