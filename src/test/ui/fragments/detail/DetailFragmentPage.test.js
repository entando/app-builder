import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailFragmentPage from 'ui/fragments/detail/DetailFragmentPage';


describe('DetailFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailFragmentPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class DetailFragmentPage', () => {
    expect(component.find('InternalPage').hasClass('DetailFragmentPage')).toEqual(true);
  });

  it('verify if exist DetailFragmentTable ', () => {
    expect(component.find('DetailFragmentTable').exists()).toEqual(true);
  });

  it('verify if exist FragmentReferenceTable ', () => {
    expect(component.find('FragmentReferenceTable').exists()).toEqual(true);
  });

  it('verify if exist PageModelReferenceTable ', () => {
    expect(component.find('PageModelReferenceTable').exists()).toEqual(true);
  });

  it('verify if exist WidgetTypeReferenceTable ', () => {
    expect(component.find('WidgetTypeReferenceTable').exists()).toEqual(true);
  });
});
