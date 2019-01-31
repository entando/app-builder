
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/SinglePageSettingsFormContainer';
import { getSelectedPage, getCharsets, getContentTypes } from 'state/pages/selectors';
import { getDefaultLanguage, getActiveNonDefaultLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';

const TEST_STATE = {
  pages: {
    selected: HOMEPAGE_PAYLOAD,
  },
  languages: {
    map: {
      it: {
        code: 'it',
        name: 'italiano',
        isActive: true,
        isDefault: false,
      },
      es: {
        code: 'es',
        name: 'espanol',
        isActive: true,
        isDefault: false,
      },
    },
    list: ['it', 'es'],
  },
  defaultLanguage: 'en',
  groups: {
    list: ['group1', 'group2'],
    map: {
      group1: {
        code: 'group1',
        name: 'Group 1',
      },
      group2: {
        code: 'group2',
        name: 'Group 2',
      },
    },
  },
  charsets: [],
  contentTypes: [],
  selectedJoinGroupCodes: [],
};

const dispatchMock = jest.fn();

describe('SinglePageSettingsContainer', () => {
  it('mapStateToProps props are correctly defined ', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      initialValues: getSelectedPage(TEST_STATE),
      activeNonDefaultLanguages: getActiveNonDefaultLanguages(TEST_STATE),
      defaultLanguage: getDefaultLanguage(TEST_STATE),
      groups: getGroupsList(TEST_STATE),
      charsets: getCharsets(TEST_STATE),
      contentTypes: getContentTypes(TEST_STATE),
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, { onSubmit: jest.fn(), onReset: jest.fn() });
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onSubmit).toBeDefined();
      expect(props.onReset).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onSubmit is called', () => {
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onReset is called', () => {
      props.onReset();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
