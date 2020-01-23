import React from 'react';
import 'test/enzyme-init';

import { mount } from 'enzyme';
import { mockRenderWithIntlAndStore, mockRenderWithRouter } from 'test/testUtils';

import PageModelPageReferencesTable from 'ui/page-models/detail/PageModelPageReferencesTable';
import { PAGE_REFS } from 'test/mocks/pageModels';


global.console.error = jest.fn();

jest.unmock('react-redux');

beforeEach(jest.clearAllMocks);

describe('PageModelPageReferencesTable (loading)', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithRouter(mockRenderWithIntlAndStore(<PageModelPageReferencesTable
      page={1}
      pageSize={1}
      totalItems={1}
      pageReferences={PAGE_REFS}
      loading
    />)));
  });

  it('has class PageModelPageReferencesTable', () => {
    expect(component).toExist('PageModelPageReferencesTable');
  });

  it('renders a loading spinner (no content)', () => {
    expect(component.find('Spinner')).toExist();
    expect(component.find('Spinner').prop('loading')).toBe(true);
  });
});

describe('PageModelPageReferencesTable (not)', () => {
  let component;
  let table;
  beforeEach(() => {
    component = mount(mockRenderWithRouter(mockRenderWithIntlAndStore(<PageModelPageReferencesTable
      page={1}
      pageSize={1}
      totalItems={1}
      pageReferences={PAGE_REFS}
    />)));
    table = component.find('.PageModelPageReferencesTable__table');
  });

  it('has class PageModelPageReferencesTable', () => {
    expect(component).toExist('PageModelPageReferencesTable');
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
        expect(row.find('.PageModelPageReferencesTable__menu-item-goto')).toExist();
      });
    });

    it('each row has a "configure page" button', () => {
      table.find('tbody tr').forEach((row) => {
        expect(row.find('.PageModelPageReferencesTable__menu-item-config')).toExist();
      });
    });
  });
});
