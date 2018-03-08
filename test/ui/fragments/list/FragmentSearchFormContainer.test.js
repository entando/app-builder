import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentSearchFormContainer';
import {
  GET_FRAGMENT_OK, WIDGET_TYPES_OK, PLUGINS_OK, WIDGET_TYPES_OPTIONS,
  PLUGINS_OPTIONS,
} from 'test/mocks/fragments';

const GET_FRAGMENT_PAYLOAD = GET_FRAGMENT_OK.payload;
const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK.payload;
const PLUGINS_PAYLOAD = PLUGINS_OK.payload;

const TEST_STATE = {
  fragments: {
    selected: GET_FRAGMENT_PAYLOAD,
    widgetTypes: WIDGET_TYPES_PAYLOAD,
    plugins: PLUGINS_PAYLOAD,
  },
};

const page = 1;
const SEARCH_FORM_VALUES = {
  code: 'my fragment',
  widgetType: 'content_viewer',
  plugin: 'jacms',
};

const dispatchMock = jest.fn();
jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

describe('FragmentSearchFormContainer', () => {
  it('maps widgetTypes and plugins property state in FragmentSearchFormContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      widgetTypes: WIDGET_TYPES_OPTIONS,
      plugins: PLUGINS_OPTIONS,
    });
  });

  it('verify that onWillMount is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
  it('verify that onSubmit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onSubmit(page, SEARCH_FORM_VALUES);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
