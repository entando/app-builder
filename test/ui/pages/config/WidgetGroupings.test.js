import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import WidgetGroupings from 'ui/pages/config/WidgetGroupings';
import WidgetGrouping from 'ui/pages/config/WidgetGrouping';
import { WIDGET_ONE_LIST } from 'test/mocks/widgets';


const WIDGET_LIST_MOCK_EMPTY = {};

describe('WidgetGroupings', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallowWithIntl(<WidgetGroupings />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('WidgetGroupings')).toBe(true);
  });

  describe('props', () => {
    it('widgetList empty data', () => {
      component = shallowWithIntl(<WidgetGroupings widgetList={WIDGET_LIST_MOCK_EMPTY} />);
      expect(component.find(WidgetGrouping).exists()).toBe(false);
    });

    it('widgetList with data', () => {
      component = shallowWithIntl(<WidgetGroupings
        groupedWidgets={WIDGET_ONE_LIST}
        widgetGroupingList={['User Widget']}
      />).dive();
      expect(component.find(WidgetGrouping).exists()).toBe(true);
    });

    it('filterWidget', () => {
      const filterWidget = jest.fn().mockReturnValue('test');
      component = shallowWithIntl(<WidgetGroupings filterWidget={filterWidget} />).dive();
      component.find('input').simulate('change', { target: { value: 'test' } });
      expect(filterWidget).toHaveBeenCalled();
      expect(filterWidget).toHaveBeenCalledWith('test');
    });
  });
});
