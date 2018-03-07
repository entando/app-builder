import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentSearchFormContainer';
import { BODY_OK, WIDGET_TYPES_PAYLOAD, PLUGINS_PAYLOAD } from 'test/mocks/fragment';

const TEST_STATE = {
  fragments: {
    selected: BODY_OK.payload,
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
    result.onSubmit();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
