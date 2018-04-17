import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentSearchFormContainer';
import { fetchWidgetList } from 'state/widgets/actions';
import { fetchPlugins, fetchFragments } from 'state/fragments/actions';

const page = 1;
const SEARCH_FORM_VALUES = {
  code: 'my fragment',
  widgetType: 'content_viewer',
  plugin: 'jacms',
};

const dispatchMock = jest.fn();
jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

jest.mock('state/fragments/selectors', () => ({
  getWidgetTypesOptions: jest.fn(),
  getPluginsOptions: jest.fn(),
}));

jest.mock('state/widgets/actions', () => ({
  fetchWidgetList: jest.fn(),
}));

jest.mock('state/fragments/actions', () => ({
  fetchPlugins: jest.fn(),
  fetchFragments: jest.fn(),
}));

describe('FragmentSearchFormContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({});
    });
    it('maps widgetTypes and plugins property state in FragmentSearchFormContainer', () => {
      expect(props).toHaveProperty('widgetTypes');
      expect(props).toHaveProperty('plugins');
    });
  });
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('verify that onWillMount is defined and when called dispatch fetchWidgetList and fetchPlugins', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchWidgetList).toHaveBeenCalled();
      expect(fetchPlugins).toHaveBeenCalled();
    });

    it('verify that onSubmit is defined by mapDispatchToProps', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit(page, SEARCH_FORM_VALUES);
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchFragments).toHaveBeenCalled();
    });
  });
});
