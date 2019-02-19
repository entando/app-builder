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
    LIST_DE_COMPONENTS_OK.forEach((componentData) => {
      // Checking if provided title is rendered.
      expect(component).toContainReact(<h1>{componentData.name}</h1>);

      // Checking if provided image is rendered.
      expect(component).toContainReact(<ComponentImage component={componentData} />);

      // Checking if provided rating is rendered.
      expect(component).toContainReact(<StarRating maxRating={5} rating={componentData.rating} />);

      // Checking if provided description is rendered.
      expect(component)
        .toContainReact(<div className="ComponentList__description">{componentData.description}</div>);
    });
  });
});
