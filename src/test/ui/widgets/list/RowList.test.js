import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RowList from 'ui/widgets/list/RowList';

const TABLEROWMOCK = (
  <RowList
    tableRow={[]}
  />
);

let component;
describe('RowList', () => {
  beforeEach(() => {
    component = shallow(TABLEROWMOCK);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
