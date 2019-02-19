import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import { CardGrid, Card } from 'patternfly-react';
import SettingsList from 'ui/digital-exchange/settings/list/SettingsList';
import DeleteSettingsModalContainer from 'ui/digital-exchange/settings/list/DeleteSettingsModalContainer';

const willMount = jest.fn();
const cards = [
  {
    id: '1',
    active: true,
    name: 'test',
    url: 'http://whatever',
  },
  {
    id: '2',
    active: false,
    name: 'test2',
    url: 'http://whatever',
  },
];

describe('SettingsListPage', () => {
  const component = shallow(<SettingsList
    onClickDelete={() => {}}
    onWillMount={willMount}
    marketplaces={cards}
  />);

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders a CardGrid', () => {
    expect(component.find(CardGrid).hasClass('SettingsListContainer')).toEqual(true);
  });

  it('call onWillMount', () => {
    expect(willMount).toHaveBeenCalled();
  });

  it('renders two cards', () => {
    expect(component.find(Card)).toHaveLength(2);
  });

  it('renders the modal', () => {
    expect(component.find(DeleteSettingsModalContainer)).toHaveLength(1);
  });
});
