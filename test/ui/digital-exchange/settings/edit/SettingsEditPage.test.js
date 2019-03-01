import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import SettingsEditPage from 'ui/digital-exchange/settings/edit/SettingsEditPage';
import SettingsEditFormContainer from 'ui/digital-exchange/settings/edit/SettingsEditFormContainer';

describe('SettingsEditPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SettingsEditPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class SettingsEditPage', () => {
    expect(component.find('InternalPage').hasClass('SettingsEditPage')).toEqual(true);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('contains a SettingsAddFormContainer', () => {
    expect(component.find(SettingsEditFormContainer)).toHaveLength(1);
  });
});
