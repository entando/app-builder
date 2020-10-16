import React from 'react';

import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import ContentWidget from 'ui/pages/config/ContentWidget';
import SectionCollapse from 'ui/common/section-collapse/SectionCollapse';
import { WIDGET_ONE_LIST } from 'test/mocks/widgets';


const WIDGET_LIST_MOCK_EMPTY = {};

describe('ContentWidget', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallowWithIntl(<ContentWidget />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('ContentWidget')).toBe(true);
  });

  describe('props', () => {
    it('widgetList empty data', () => {
      component = shallowWithIntl(<ContentWidget widgetList={WIDGET_LIST_MOCK_EMPTY} />);
      expect(component.find(SectionCollapse).exists()).toBe(false);
    });

    it('widgetList with data', () => {
      component = shallowWithIntl(<ContentWidget widgetList={WIDGET_ONE_LIST} />).dive();
      expect(component.find(SectionCollapse).exists()).toBe(true);
    });

    it('filterWidget', () => {
      const filterWidget = jest.fn().mockReturnValue('test');
      component = shallowWithIntl(<ContentWidget filterWidget={filterWidget} />).dive();
      component.find('input').simulate('change', { target: { value: 'test' } });
      expect(filterWidget).toHaveBeenCalled();
      expect(filterWidget).toHaveBeenCalledWith('test');
    });
  });
});
