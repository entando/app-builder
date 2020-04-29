import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import PageTemplateDetailTable from 'ui/page-templates/detail/PageTemplateDetailTable';
import { SINGLE_CELL_PAYLOAD } from 'test/mocks/pageTemplates';


const PAGE_TEMPLATE = SINGLE_CELL_PAYLOAD;

global.console.error = jest.fn();

beforeEach(jest.clearAllMocks);

describe('PageTemplateDetailTable (loading)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageTemplateDetailTable
        page={1}
        pageSize={1}
        totalItems={1}
        pageTemplate={SINGLE_CELL_PAYLOAD}
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

describe('PageTemplateDetailTable (not loading, with content)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageTemplateDetailTable
        page={1}
        pageSize={1}
        totalItems={1}
        pageTemplate={PAGE_TEMPLATE}
        loading={false}
      />
    ));
  });

  it('renders a spinner (with content)', () => {
    expect(component.is('Spinner')).toBe(true);
    expect(component.children()).not.toHaveLength(0);
  });

  it('renders the page template code', () => {
    expect(component.contains(PAGE_TEMPLATE.code)).toBe(true);
  });

  it('renders the page template name', () => {
    expect(component.contains(PAGE_TEMPLATE.descr)).toBe(true);
  });

  it('renders the template preview grid', () => {
    expect(component.find('PageConfigGrid')).toExist();
  });
});
