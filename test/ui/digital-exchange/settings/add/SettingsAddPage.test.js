import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import SettingsAddPage from 'ui/digital-exchange/settings/add/SettingsAddPage';
import SettingsAddFormContainer from 'ui/digital-exchange/settings/add/SettingsAddFormContainer';

describe('SettingsAddPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SettingsAddPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class SettingsAddPage', () => {
    expect(component.find('InternalPage').hasClass('SettingsAddPage')).toEqual(true);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('contains a SettingsAddFormContainer', () => {
    expect(component.find(SettingsAddFormContainer)).toHaveLength(1);
  });
});
