import React from 'react';

import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import AttributeListTableComposite from 'ui/common/contenttype-attributes/AttributeListTableComposite';

configEnzymeAdapter();

const props = {
  onAddAttribute: () => {},
  onClickDelete: () => {},
  onMove: () => {},
  attributesList: ['a', 'b', 'c'],
  compositeAttributes: [
    {
      code: 'Via',
      type: 'Text',
      name: 'Via',
      mandatory: false,
    },
    {
      code: 'Civico',
      type: 'Text',
      name: 'Civico',
      mandatory: true,
    },
  ],
};

describe('AttributeListTableComposite', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeListTableComposite {...props} />);
    expect(component.exists()).toEqual(true);
  });
});
