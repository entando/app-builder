import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import moment from 'moment';

import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import ComponentListGridView from 'ui/digital-exchange/components/list/ComponentListGridView';
import ComponentInstallActionsContainer from 'ui/digital-exchange/components/common/ComponentInstallActionsContainer';


describe('ComponentListGridView', () => {
  let component;
  let deComponents;

  beforeEach(() => {
    component = shallow(<ComponentListGridView components={LIST_DE_COMPONENTS_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders all the digital exchange components', () => {
    deComponents = component.find('.ComponentList__component');
    expect(deComponents).toHaveLength(LIST_DE_COMPONENTS_OK.length);
  });

  describe('digital exchange component', () => {
    it('renders the name', () => {
      const h1 = deComponents.first().find('h1');
      expect(h1).toHaveLength(1);
      expect(h1.text()).toEqual(LIST_DE_COMPONENTS_OK[0].name);
    });

    it('renders the date', () => {
      const date = deComponents.first().find('.ComponentList__date');
      expect(date).toHaveLength(1);
      expect(date.text()).toEqual(moment(LIST_DE_COMPONENTS_OK[0].lastUpdate).format('MMMM, D, YYYY'));
    });

    it('renders the version', () => {
      const version = deComponents.first().find('.ComponentList__version');
      expect(version).toHaveLength(1);
      const versionFormattedMessage = version.find('FormattedMessage');
      expect(versionFormattedMessage).toHaveLength(1);
      expect(versionFormattedMessage.props()).toHaveProperty('id', 'digitalExchange.components.latestVersion');
      expect(version.text()).toEqual(`<FormattedMessage />: ${LIST_DE_COMPONENTS_OK[0].version}`);
    });

    it('renders the image', () => {
      const image = deComponents.first().find('ComponentImage');
      expect(image).toHaveLength(1);
      expect(image.props()).toHaveProperty('component', LIST_DE_COMPONENTS_OK[0]);
    });

    it('renders the intall action', () => {
      const installAction = deComponents.first().find(ComponentInstallActionsContainer);
      expect(installAction).toHaveLength(1);
      expect(installAction.props()).toHaveProperty('component', LIST_DE_COMPONENTS_OK[0]);
    });

    it('renders the star rating', () => {
      const starRating = deComponents.first().find('StarRating');
      expect(starRating).toHaveLength(1);
      expect(starRating.props()).toHaveProperty('rating', LIST_DE_COMPONENTS_OK[0].rating);
    });
  });
});
