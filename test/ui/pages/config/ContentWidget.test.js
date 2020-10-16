import React from 'react';

import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import ContentWidget from 'ui/pages/config/ContentWidget';
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
      expect(component.find('.ContentWidgetElement__widget-spacer').exists()).toBeFalsy();
      expect(component.find('.ContentWidgetElement__widget-spacer')).toHaveLength(0);
    });

    it('widgetList with data', () => {
      component = shallowWithIntl(<ContentWidget widgetList={WIDGET_ONE_LIST} />).dive();
      expect(component.find('.ContentWidgetElement__widget-spacer').exists()).toBeTruthy();
      expect(component.find('.ContentWidgetElement__widget-spacer')).toHaveLength(1);
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
