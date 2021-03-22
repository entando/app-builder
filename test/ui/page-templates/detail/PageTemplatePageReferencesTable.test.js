import React from 'react';
import 'test/enzyme-init';

import { mount } from 'enzyme';
import { mockRenderWithIntlAndStore, mockRenderWithRouter } from 'test/legacyTestUtils';

import PageTemplatePageReferencesTable from 'ui/page-templates/detail/PageTemplatePageReferencesTable';
import { PAGE_REFS } from 'test/mocks/pageTemplates';


global.console.error = jest.fn();

jest.unmock('react-redux');

beforeEach(jest.clearAllMocks);

describe('PageTemplatePageReferencesTable (loading)', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithRouter(mockRenderWithIntlAndStore(<PageTemplatePageReferencesTable
      page={1}
      pageSize={1}
      totalItems={1}
      pageReferences={PAGE_REFS}
      loading
    />)));
  });

  it('has class PageTemplatePageReferencesTable', () => {
    expect(component).toExist('PageTemplatePageReferencesTable');
  });

  it('renders a loading spinner (no content)', () => {
    expect(component.find('Spinner')).toExist();
    expect(component.find('Spinner').prop('loading')).toBe(true);
  });
});

describe('PageTemplatePageReferencesTable (not)', () => {
  let component;
  let table;
  beforeEach(() => {
    component = mount(mockRenderWithRouter(mockRenderWithIntlAndStore(<PageTemplatePageReferencesTable
      page={1}
      pageSize={1}
      totalItems={1}
      pageReferences={PAGE_REFS}
    />)));
    table = component.find('.PageTemplatePageReferencesTable__table');
  });

  it('has class PageTemplatePageReferencesTable', () => {
    expect(component).toExist('PageTemplatePageReferencesTable');
  });

  it('renders a loading spinner (no content)', () => {
    expect(component.find('Spinner')).toExist();
    expect(component.find('Spinner').prop('loading')).toBe(false);
  });

  describe('the table', () => {
    it('has 3 columns', () => {
      expect(table.find('thead th')).toHaveLength(3);
    });

    it('has as many rows as pageReferences', () => {
      expect(table.find('tbody tr')).toHaveLength(PAGE_REFS.length);
    });

    it('each row has a "go to page" button', () => {
      table.find('tbody tr').forEach((row) => {
        expect(row.find('.PageTemplatePageReferencesTable__menu-item-goto')).toExist();
      });
    });

    it('each row has a "configure page" button', () => {
      table.find('tbody tr').forEach((row) => {
        expect(row.find('.PageTemplatePageReferencesTable__menu-item-config')).toExist();
      });
    });
  });
});
