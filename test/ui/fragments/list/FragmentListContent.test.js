import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import FragmentListContent from 'ui/fragments/list/FragmentListContent';

describe('ListFragmentPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FragmentListContent />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has class FragmentListContent', () => {
    expect(component.hasClass('FragmentListContent')).toBe(true);
  });

  it('has three Rows', () => {
    expect(component.find('Row')).toHaveLength(3);
  });


  it('has the add button', () => {
    expect(component.find('Button.FragmentListContent__add')).toHaveLength(1);
  });
});
