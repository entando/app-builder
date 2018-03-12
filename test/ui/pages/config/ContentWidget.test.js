import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { WIDGET_ONE_LIST } from 'test/mocks/widgetList';


const WIDGET_LIST_MOCK_EMPTY = {};

describe('ContentWidget', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<ContentWidget />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('ContentWidget')).toBe(true);
  });

  describe('props', () => {
    it('widgetList empty data', () => {
      component = shallow(<ContentWidget widgetList={WIDGET_LIST_MOCK_EMPTY} />);
      expect(component.find('.ContentWidgetElement__widget-spacer').exists()).toBeFalsy();
      expect(component.find('.ContentWidgetElement__widget-spacer')).toHaveLength(0);
    });
    it('widgetList with data', () => {
      component = shallow(<ContentWidget widgetList={WIDGET_ONE_LIST} />);
      expect(component.find('.ContentWidgetElement__widget-spacer').exists()).toBeTruthy();
      expect(component.find('.ContentWidgetElement__widget-spacer')).toHaveLength(1);
    });
    it('filterWidget', () => {
      const filterWidget = jest.fn().mockReturnValue('test');
      component = shallow(<ContentWidget filterWidget={filterWidget} />);
      component.find('input').simulate('change', { target: { value: 'test' } });
      expect(filterWidget).toHaveBeenCalled();
      expect(filterWidget).toHaveBeenCalledWith('test');
    });
    it('changeViewList with card view  ', () => {
      const changeViewList = jest.fn().mockReturnValue('card');
      component = shallow(<ContentWidget changeViewList={changeViewList} />);
      component.find('.fa.fa-th-large').simulate('click');
      expect(changeViewList).toHaveBeenCalled();
      expect(changeViewList).toHaveBeenCalledWith('card');
    });
    it('changeViewList with list view  ', () => {
      const changeViewList = jest.fn().mockReturnValue('list');
      component = shallow(<ContentWidget changeViewList={changeViewList} />);
      component.find('.fa.fa-th-list').simulate('click');
      expect(changeViewList).toHaveBeenCalled();
      expect(changeViewList).toHaveBeenCalledWith('list');
    });
  });
});
