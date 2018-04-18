import { PLUGINS_OK, GET_FRAGMENT_OK, PLUGINS_OPTIONS } from 'test/mocks/fragments';
import { WIDGETS_MAP } from 'test/mocks/widgets';
import { getWidgetsMap } from 'state/widgets/selectors';

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

const PLUGINS_PAYLOAD = PLUGINS_OK.payload;
const FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;

const MOCK_STATE = {
  fragments: {
    list,
    selected: FRAGMENT_PAYLOAD,
    plugins: PLUGINS_PAYLOAD,
  },
};

jest.mock('state/widgets/selectors', () => ({
  getWidgetsMap: jest.fn(),
}));

getWidgetsMap.mockReturnValue(WIDGETS_MAP);

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
    expect(selected[0]).toHaveProperty('optgroup', 'User Widget');
    expect(selected[0]).toHaveProperty('options', expect.any(Array));
  });
  it('getPluginsOptions(state) returns a calculated pluginsOption list', () => {
    const selected = getPluginsOptions(MOCK_STATE);
    expect(selected).toEqual(PLUGINS_OPTIONS);
  });
});
