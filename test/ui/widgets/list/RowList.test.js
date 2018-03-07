import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RowList, { renderRow } from 'ui/widgets/list/RowList';


const rows = [
  {
    code: 'code1',
    name: 'name1',
    used: 5,
    type: 'BAA',
  },
  {
    code: 'code2',
    name: 'name2',
    used: 1,
    type: 'AAA',
  },
];

const TABLEROWMOCK = (
  <RowList
    tableRow={rows}
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

  it('renderRow method renders a WidgetListRow class element', () => {
    component = shallow(renderRow(rows[0]));
    expect(component.find('.WidgetListRow').exists()).toEqual(true);
  });
});
