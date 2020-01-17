import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AddDataModelPage from 'ui/data-models/add/AddDataModelPage';
import { shallowWithIntl } from '../../../test/testUtils';

describe('AddDataModelPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<AddDataModelPage />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if exist InternalPage with class AddDataModelPage', () => {
    expect(component.find('InternalPage').hasClass('AddDataModelPage')).toEqual(true);
  });
});
