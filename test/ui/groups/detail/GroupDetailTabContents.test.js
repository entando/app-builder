import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import GroupDetailTabContents from 'ui/groups/detail/GroupDetailTabContents';
import { CONTENT_REFERENCES } from 'test/mocks/groups';

global.console.error = jest.fn();

describe('GroupDetailTabContents', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<GroupDetailTabContents page={1} pageSize={1} totalItems={1} />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    shallowWithIntl(<GroupDetailTabContents pageSize={1} totalItems={1} />).dive();
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without a pageSize', () => {
    shallowWithIntl(<GroupDetailTabContents page={1} totalItems={1} />).dive();
    expect(console.error).toHaveBeenCalled();
  });

  it('errors without totalItems', () => {
    shallowWithIntl(<GroupDetailTabContents pageSize={1} page={1} />).dive();
    expect(console.error).toHaveBeenCalled();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<GroupDetailTabContents
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
        component.setProps({ contentReferences: CONTENT_REFERENCES });
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
