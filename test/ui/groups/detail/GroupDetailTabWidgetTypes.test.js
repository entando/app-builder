import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import GroupDetailTabWidgetTypes from 'ui/groups/detail/GroupDetailTabWidgetTypes';
import { WIDGETTYPE_REFERENCES } from 'test/mocks/groups';

global.console.error = jest.fn();

describe('GroupDetailTabWidgetTypes', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<GroupDetailTabWidgetTypes page={1} pageSize={1} totalItems={1} />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    shallowWithIntl(<GroupDetailTabWidgetTypes pageSize={1} totalItems={1} />).dive();
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without a pageSize', () => {
    shallowWithIntl(<GroupDetailTabWidgetTypes page={1} totalItems={1} />).dive();
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without totalItems', () => {
    shallowWithIntl(<GroupDetailTabWidgetTypes pageSize={1} page={1} />).dive();
    expect(console.error).toHaveBeenCalled();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<GroupDetailTabWidgetTypes
        page={1}
        pageSize={1}
        totalItems={1}
      />).dive();
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with pageReferences', () => {
      beforeEach(() => {
        component.setProps({ widgetReferences: WIDGETTYPE_REFERENCES });
      });

      it('has 1 rows', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(1);
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
