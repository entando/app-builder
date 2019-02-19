import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';
import ComponentListListView from 'ui/digital-exchange/components/list/ComponentListListView';
import ComponentImage from 'ui/digital-exchange/components/common/ComponentImage';
import StarRating from 'ui/digital-exchange/common/StarRating';


describe('ComponentListListView', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListListView components={LIST_DE_COMPONENTS_OK} />);
  });


  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has 5 rows, 1 for each component', () => {
    expect(component.find('Row')).toHaveLength(5);
  });

  it('provided content is rendered properly', () => {
    LIST_DE_COMPONENTS_OK.forEach((componentData, index) => {
      // Checking if provided title is rendered.
      expect(component.find('h1').at(index).text()).toContain(componentData.name);

      // Checking if provided image is rendered.
      const componentImageProp = component.find('ComponentImage').at(index).props().component;
      expect(componentImageProp.name).toEqual(componentData.name);
      expect(componentImageProp.image).toEqual(componentData.image);

      // Checking if provided rating is rendered.
      expect(component.find(StarRating).at(index).props().rating).toEqual(componentData.rating);

      // Checking if provided description is rendered.
      expect(component.find('.ComponentList__description').at(index).text()).toEqual(componentData.description);
    });
  });
});
