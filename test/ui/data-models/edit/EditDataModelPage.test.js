import React from 'react';

import 'test/enzyme-init';
import { EditDataModelPageBody } from 'ui/data-models/edit/EditDataModelPage';
import { shallowWithIntl } from 'test/testUtils';

describe('EditDataModelPage', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<EditDataModelPageBody />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if exist InternalPage with class EditDataModelPage', () => {
    expect(component.find('InternalPage').hasClass('EditDataModelPage')).toBe(true);
  });
});
