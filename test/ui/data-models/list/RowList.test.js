
import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RowList, { renderRow } from 'ui/data-models/list/RowList';

const rows = [
  {
    descr: 'descr2',
    name: 'name1',
    type: 'AAA',
    modelId: 'test',
  },
  {
    descr: 'descr3',
    name: 'name2',
    type: 'AAA',
    modelId: 'rest',
  },
];

const DATA_MODEL_MOCK = (
  <RowList
    dataModels={rows}
  />
);

let component;
describe('RowList', () => {
  beforeEach(() => {
    component = shallow(DATA_MODEL_MOCK);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renderRow method renders a DataModelListRow class element', () => {
    component = shallow(renderRow(rows[0]));
    expect(component.find('.DataModelListRow').exists()).toEqual(true);
  });
});
