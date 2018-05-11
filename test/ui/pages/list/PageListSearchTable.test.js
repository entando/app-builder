import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

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
      component = shallow(<PageListSearchTable
        page={1}
        pageSize={1}
        totalItems={1}
        {...props}
      />);
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
      component = shallow(<PageListSearchTable
        page={1}
        pageSize={1}
        totalItems={1}
        {...props}
        searchPages={searchPages}
      />);
    });

    it('has a table', () => {
      expect(component.find('table')).toHaveLength(1);
    });

    it('has a table header', () => {
      const thead = component.find('thead');
      expect(thead).toHaveLength(1);
      expect(thead.find('th')).toHaveLength(3);
    });

    it('has one row if there is one searchPage ', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(1);
      expect(tbody.find('PageTreeActionMenu')).toHaveLength(1);
    });

    it('has a menu in the action column of each row', () => {
      component.find('tbody tr').forEach((tr) => {
        expect(tr.find('PageTreeActionMenu')).toHaveLength(1);
      });
    });

    it('has a paginator', () => {
      expect(component.find('Paginator')).toExist();
    });
  });
});
