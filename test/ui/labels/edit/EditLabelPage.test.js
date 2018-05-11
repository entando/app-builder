import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internal-page/InternalPage';
import EditLabelPage from 'ui/labels/edit/EditLabelPage';

describe('EditLabelPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditLabelPage />);
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
