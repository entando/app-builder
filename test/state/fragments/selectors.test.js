import { PLUGINS_OK, GET_FRAGMENT_OK, PLUGINS_OPTIONS, FILTERS_OK } from 'test/mocks/fragments';
import { WIDGET } from 'test/mocks/widgets';
import { getListWidget } from 'state/widgets/selectors';

import {
  getFragments, getWidgetTypes, getPlugins, getFragmentSelected,
  getWidgetTypesOptions, getPluginsOptions, getFragmentList, getFilters,
} from 'state/fragments/selectors';

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const list = [
  {
    code: 'myCode',
  },
];

const PLUGINS_PAYLOAD = PLUGINS_OK.payload;
const FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;

const MOCK_STATE = {
  fragments: {
    list,
    selected: FRAGMENT_PAYLOAD,
    plugins: PLUGINS_PAYLOAD,
    filters: FILTERS_OK,
  },
};

const MOCK_WIDGET_LIST = [
  {
    ...WIDGET, code: 'search_form', widgetCategory: 'cms', titles: { it: 'Form di ricerca', en: 'Search Form' }, used: 3,
  },
  {
    ...WIDGET, code: 'single_content', widgetCategory: 'cms', titles: { it: 'Singolo Contenuto', en: 'Single Content' }, used: 4,
  },
  {
    ...WIDGET, code: 'content_viewer', widgetCategory: 'cms', titles: { it: 'Contenuti', en: 'Contents' }, used: 2,
  },
  {
    ...WIDGET, code: 'other_widget', widgetCategory: 'other', titles: { it: 'Altro Widget', en: 'Other Widget' }, used: 0,
  },
];

jest.mock('state/widgets/selectors', () => ({
  getListWidget: jest.fn(),
}));

getListWidget.mockReturnValue(MOCK_WIDGET_LIST);

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
    expect(selected[0]).toHaveProperty('optgroup', 'cms');
    expect(selected[0]).toHaveProperty('options.length', 3);
    expect(selected[1]).toHaveProperty('optgroup', 'other');
    expect(selected[1]).toHaveProperty('options.length', 1);
  });
  it('getPluginsOptions(state) returns a calculated pluginsOption list', () => {
    const selected = getPluginsOptions(MOCK_STATE);
    expect(selected).toEqual(PLUGINS_OPTIONS);
  });
  it('getFilters(state) returns the stored filters', () => {
    const selected = getFilters(MOCK_STATE);
    expect(selected).toEqual(FILTERS_OK);
  });
});
