import { WIDGET_TYPES_OK, PLUGINS_OK, GET_FRAGMENT_OK } from 'test/mocks/fragments';

import {
  getFragments, getWidgetTypes, getPlugins, getFragmentSelected,
  getWidgetTypesOptions, getPluginsOptions, getFragmentList,
} from 'state/fragments/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const list = [
  {
    code: 'myCode',
  },
];

const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK.payload;
const PLUGINS_PAYLOAD = PLUGINS_OK.payload;
const FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;


const MOCK_STATE = {
  fragments: {
    list,
    selected: FRAGMENT_PAYLOAD,
    widgetTypes: WIDGET_TYPES_PAYLOAD,
    plugins: PLUGINS_PAYLOAD,
  },
};

const PLUGINS_OPTIONS = [{ code: 'jacms', title: 'CMS' }];
const WIDGET_TYPES_OPTIONS = [
  {
    optgroup: 'CMS',
    options: [
      {
        code: 'row_content_viewer_list',
        title: 'Contents - Publish Contents',
      },
      {
        code: 'content_viewer',
        title: 'Contents - Publish a Content',
      },
      {
        code: 'content_viewer_list',
        title: 'Contents - Publish a List of Contents',
      },
      {
        code: 'search_result',
        title: 'Search - Search Result',
      },
    ],
  },
  {
    optgroup: 'User widgets',
    options: [
      {
        code: 'user_widget_test',
        title: 'Test Widget',
      },
    ],
  },
];

describe('state/fragments/selectors', () => {
  it('getFragments(state) returns the fragments object', () => {
    const selected = getFragments(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments);
  });
  it('verify getFragmentList selector', () => {
    expect(getFragmentList(MOCK_STATE)).toEqual(list);
  });
  it('getWidgetTypes(state) returns the widgetTypes list', () => {
    const selected = getWidgetTypes(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments.widgetTypes);
  });
  it('getPlugins(state) returns the plugins list', () => {
    const selected = getPlugins(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments.plugins);
  });
  it('getFragmentSelected(state) returns the selected object', () => {
    const selected = getFragmentSelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.fragments.selected);
  });
  it('getWidgetTypesOptions(state) returns a calculated widgetTypesOption list', () => {
    const selected = getWidgetTypesOptions(MOCK_STATE);
    expect(selected).toEqual(WIDGET_TYPES_OPTIONS);
    expect(selected[0].optgroup).toBeDefined();
    expect(selected[0].options).toBeDefined();
  });
  it('getPluginsOptions(state) returns a calculated pluginsOption list', () => {
    const selected = getPluginsOptions(MOCK_STATE);
    expect(selected).toEqual(PLUGINS_OPTIONS);
  });
});
