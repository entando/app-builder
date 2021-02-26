import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import { SEARCH_PAGES } from 'test/mocks/pages';
import PageListSearchTable from 'ui/pages/list/PageListSearchTable';

const searchPages = SEARCH_PAGES;

const props = {
  locale: 'en',
  onClickAdd: jest.fn(),
  onClickEdit: jest.fn(),
  onClickConfigure: jest.fn(),
  onClickClone: jest.fn(),
  onClickDelete: jest.fn(),
  onClickDetails: jest.fn(),
  onClickPublish: jest.fn(),
  onClickUnPublish: jest.fn(),
};

describe('PageListSearchTable', () => {
  describe('without searchPages', () => {
    let component;
    beforeEach(() => {
      component = shallowWithIntl(<PageListSearchTable
        page={1}
        pageSize={1}
        totalItems={1}
        {...props}
      />).dive();
    });

    it('renders without crashing', () => {
      expect(component).toExist();
    });

    it('renders an Alert', () => {
      const alert = component.find('Alert');
      expect(alert).toExist();
    });
  });

  describe('with searchPages', () => {
    let component;
    beforeEach(() => {
      component = shallowWithIntl(<PageListSearchTable
        page={1}
        pageSize={1}
        totalItems={1}
        {...props}
        searchPages={searchPages}
      />).dive();
    });

    it('has a table', () => {
      expect(component.find('DataTable')).toHaveLength(1);
    });

    it('has a paginator', () => {
      expect(component.find('Paginator')).toExist();
    });
  });
});
