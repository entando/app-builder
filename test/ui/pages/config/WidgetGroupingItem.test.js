import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetGroupingItem from 'ui/pages/config/WidgetGroupingItem';


const WIDGET_NAME = 'My Widget';


describe('ContentWidgetElement', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetGroupingItem widgetName={WIDGET_NAME} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('wraps itself with connectDragSource function if provided', () => {
    const connectDragSource = jest.fn()
      .mockImplementation(arg => <span className="connected">{arg}</span>);
    component = shallow((
      <WidgetGroupingItem
        widgetName={WIDGET_NAME}
        connectDragSource={connectDragSource}
      />
    ));
    expect(connectDragSource).toHaveBeenCalled();
    expect(component.find('.connected').exists()).toBe(true);
  });
});
