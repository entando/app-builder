import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import SettingsListPage from 'ui/digital-exchange/settings/list/SettingsListPage';
import SettingsListContainer from 'ui/digital-exchange/settings/list/SettingsListContainer';

describe('SettingsListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SettingsListPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if the InternalPage has class SettingsListPage', () => {
    expect(component.find('InternalPage').hasClass('SettingsListPage')).toEqual(true);
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toHaveLength(1);
  });

  it('contains a SettingsListContainer', () => {
    expect(component.find(SettingsListContainer)).toHaveLength(1);
  });
});
