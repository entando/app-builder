import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import EditDataModelPage from 'ui/data-models/edit/EditDataModelPage';

describe('EditDataModelPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<EditDataModelPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class EditDataModelPage', () => {
    expect(component.find('InternalPage').hasClass('EditDataModelPage')).toEqual(true);
  });
});
