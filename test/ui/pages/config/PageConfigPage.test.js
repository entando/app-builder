import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageConfigPage from 'ui/pages/config/PageConfigPage';


describe('PageConfigPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<PageConfigPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('PageConfigPage')).toBe(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<PageConfigPage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
    component.unmount();
    onWillMount.mockClear();
    expect(onWillMount).not.toHaveBeenCalled();
  });

  it('will call onWillUnmount on componentWillUnmount', () => {
    const onWillUnmount = jest.fn();
    component = shallow(<PageConfigPage onWillUnmount={onWillUnmount} />);
    expect(onWillUnmount).not.toHaveBeenCalled();
    component.unmount();
    expect(onWillUnmount).toHaveBeenCalled();
  });
});
