import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import moment from 'moment';

import { LIST_ECR_COMPONENTS_OK } from 'test/mocks/component-repository/components';
import ComponentListGridView from 'ui/component-repository/components/list/ComponentListGridView';
import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';


describe('ComponentListGridView', () => {
  let component;
  let deComponents;

  beforeEach(() => {
    component = shallow(<ComponentListGridView components={LIST_ECR_COMPONENTS_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders all the component repository components', () => {
    deComponents = component.find('.ComponentList__component');
    expect(deComponents).toHaveLength(LIST_ECR_COMPONENTS_OK.length);
  });

  describe('component repository item', () => {
    it('renders the title', () => {
      const h1 = deComponents.first().find('h1');
      expect(h1).toHaveLength(1);
      expect(h1.text()).toEqual(LIST_ECR_COMPONENTS_OK[0].title);
    });

    it('renders the date', () => {
      const date = deComponents.first().find('.ComponentList__date');
      expect(date).toHaveLength(1);
      expect(date.text()).toEqual(moment(LIST_ECR_COMPONENTS_OK[0].lastUpdate).format('MMMM, D, YYYY'));
    });

    it('renders the latest version', () => {
      const version = deComponents.first().find('.ComponentList__version');
      expect(version).toHaveLength(1);
      const versionFormattedMessage = version.find('FormattedMessage');
      expect(versionFormattedMessage).toHaveLength(1);
      expect(versionFormattedMessage.props()).toHaveProperty('id', 'componentRepository.components.latestVersion');
      expect(version.text()).toEqual(`<FormattedMessage />: ${LIST_ECR_COMPONENTS_OK[0].latestVersion.version}`);
    });

    it('renders the image', () => {
      const image = deComponents.first().find('ComponentImage');
      expect(image).toHaveLength(1);
      expect(image.props()).toHaveProperty('component', LIST_ECR_COMPONENTS_OK[0]);
    });

    it('renders the install action', () => {
      const installAction = deComponents.first().find(ComponentInstallActionsContainer);
      expect(installAction).toHaveLength(1);
      expect(installAction.props()).toHaveProperty('component', LIST_ECR_COMPONENTS_OK[0]);
    });
  });
});
