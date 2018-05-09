import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internal-page/InternalPage';
import AddLabelsPage from 'ui/labels/add/AddLabelsPage';

describe('AddLabelsPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddLabelsPage />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('verify if component type is InternalPage', () => {
    expect(component.type()).toBe(InternalPage);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });
});
