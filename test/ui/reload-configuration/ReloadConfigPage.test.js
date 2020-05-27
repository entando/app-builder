import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internal-page/InternalPage';
import { ReloadConfigPageBody } from 'ui/reload-configuration/ReloadConfigPage';


describe('ReloadConfigPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ReloadConfigPageBody />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('verify if exist InternalPage node', () => {
    expect(component.type()).toBe(InternalPage);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
