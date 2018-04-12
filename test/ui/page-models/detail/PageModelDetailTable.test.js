import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import PageModelDetailTable from 'ui/page-models/detail/PageModelDetailTable';
import { SINGLE_CELL_PAYLOAD } from 'test/mocks/pageModels';


const PAGE_MODEL = SINGLE_CELL_PAYLOAD;

global.console.error = jest.fn();

beforeEach(jest.clearAllMocks);

describe('PageModelDetailTable (loading)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageModelDetailTable
        page={1}
        pageSize={1}
        totalItems={1}
        pageModel={SINGLE_CELL_PAYLOAD}
        loading
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('renders a spinner (no content)', () => {
    expect(component.is('Spinner')).toBe(true);
    expect(component.children()).toHaveLength(0);
  });
});

describe('PageModelDetailTable (not loading, with content)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageModelDetailTable
        page={1}
        pageSize={1}
        totalItems={1}
        pageModel={PAGE_MODEL}
        loading={false}
      />
    ));
  });

  it('renders a spinner (with content)', () => {
    expect(component.is('Spinner')).toBe(true);
    expect(component.children()).not.toHaveLength(0);
  });

  it('renders the page model code', () => {
    expect(component.contains(PAGE_MODEL.code)).toBe(true);
  });

  it('renders the page model name', () => {
    expect(component.contains(PAGE_MODEL.descr)).toBe(true);
  });

  it('renders the template preview grid', () => {
    expect(component.find('PageConfigGrid')).toExist();
  });
});
