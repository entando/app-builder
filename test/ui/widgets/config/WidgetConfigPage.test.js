import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';


describe('WidgetConfigPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<WidgetConfigPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the WidgetConfigPage class', () => {
    expect(component.hasClass('WidgetConfigPage')).toBe(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<WidgetConfigPage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
    component.unmount();
    onWillMount.mockClear();
    expect(onWillMount).not.toHaveBeenCalled();
  });

  it('will call onWillUnmount on componentWillUnmount', () => {
    const onWillUnmount = jest.fn();
    component = shallow(<WidgetConfigPage onWillUnmount={onWillUnmount} />);
    expect(onWillUnmount).not.toHaveBeenCalled();
    component.unmount();
    expect(onWillUnmount).toHaveBeenCalled();
  });

  it('will toggle info table on click info button', () => {
    component = shallow(<WidgetConfigPage />);
    expect(component.state('infoTableOpen')).toBe(false);
    component.find('.WidgetConfigPage__info-btn').simulate('click');
    expect(component.state('infoTableOpen')).toBe(true);
  });
});
