import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { LIST_ECR_COMPONENTS_OK } from 'test/mocks/component-repository/components';
import ComponentListListView from 'ui/component-repository/components/list/ComponentListListView';

describe('ComponentListListView', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListListView components={LIST_ECR_COMPONENTS_OK} />);
  });


  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('provided content is rendered properly', () => {
    LIST_ECR_COMPONENTS_OK.forEach((componentData, index) => {
      // Checking if provided title is rendered.
      expect(component.find('h1').at(index).text()).toContain(componentData.title);

      // Checking if provided image is rendered.
      if (componentData.image) {
        const componentImageWrapper = component.find('.ComponentList_component-image-wrapper').at(index);
        expect(componentImageWrapper.html()).toContain(componentData.image);
      }

      // Checking if provided version is rendered.
      expect(component.find('.ComponentList__version').at(index).text()).toContain(componentData.latestVersion.version);

      // Checking if provided description is rendered.
      expect(component.find('.ComponentList__description').at(index).text()).toEqual(componentData.description);
    });
  });
});
