import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { mockRenderWithIntlAndStore } from 'test/testUtils';
import PageTemplateListTable from 'ui/page-templates/list/PageTemplateListTable';
import { PAGE_TEMPLATES_LIST } from 'test/mocks/pageTemplates';

global.console.error = jest.fn();
const onWillMount = jest.fn();
const removePageTemplate = jest.fn();

const TOTAL_ITEMS = 100;
const PAGE_SIZE = 5;
const PAGE = 1;

const props = {
  page: PAGE,
  pageSize: PAGE_SIZE,
  totalItems: TOTAL_ITEMS,
  onWillMount,
  columnOrder: [],
  removePageTemplate,
};

const requiredState = {
  modal: { info: {}, visibleModal: '' },
};

jest.unmock('react-redux');

const renderComponent = (addProps = {}) => render(
  mockRenderWithIntlAndStore(
    <PageTemplateListTable {...props} {...addProps} />,
    requiredState,
  ),
);


beforeEach(jest.clearAllMocks);
describe('PageTemplateListTable', () => {
  it('renders without crashing & it calls onWillMount', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.PageTemplateListTable')).toBeInTheDocument();
    expect(onWillMount).toHaveBeenCalled();
  });

  describe('required props', () => {
    it('errors without a page', () => {
      // eslint-disable-next-line max-len
      render(mockRenderWithIntlAndStore(
        <PageTemplateListTable pageSize={PAGE_SIZE} totalItems={TOTAL_ITEMS} />,
        requiredState,
      ));
      expect(global.console.error).toHaveBeenCalled();
    });

    it('errors without a pageSize', () => {
      render(mockRenderWithIntlAndStore(
        <PageTemplateListTable page={PAGE} totalItems={TOTAL_ITEMS} />,
        requiredState,
      ));
      expect(global.console.error).toHaveBeenCalled();
    });

    it('errors without totalItems', () => {
      render(mockRenderWithIntlAndStore(
        <PageTemplateListTable pageSize={PAGE_SIZE} page={PAGE} />,
        requiredState,
      ));
      expect(global.console.error).toHaveBeenCalled();
    });
  });

  it('has a table', () => {
    const { container } = renderComponent();
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('has a table header', () => {
    const { container } = renderComponent();
    const thead = container.querySelector('thead');
    expect(thead).toBeInTheDocument();
  });

  it('has no rows', () => {
    const { container } = renderComponent();
    const tbody = container.querySelector('tbody');
    expect(tbody).toBeInTheDocument();
    expect(tbody.querySelector('tr')).not.toBeInTheDocument();
  });

  it('has a paginator', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.table-view-pf-pagination')).toBeInTheDocument();
  });

  it('on change page, it calls onWillMount with new page data', () => {
    onWillMount.mockClear();
    const { getByTitle } = renderComponent({ pageTemplates: PAGE_TEMPLATES_LIST });
    fireEvent.click(getByTitle('Next page'));
    expect(onWillMount).toHaveBeenCalledWith({
      page: 2,
      pageSize: PAGE_SIZE,
    });
  });

  describe('with page templates', () => {

    it('has as many rows as the page templates count', () => {
      const { container } = renderComponent({ pageTemplates: PAGE_TEMPLATES_LIST });
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
      expect(tbody.querySelectorAll('tr')).toHaveLength(PAGE_TEMPLATES_LIST.length);
    });

    it('has a menu in the action column of each row', () => {
      const { container } = renderComponent({ pageTemplates: PAGE_TEMPLATES_LIST });
      container.querySelectorAll('tbody tr').forEach((tr) => {
        expect(tr.querySelector('.dropdown.dropdown-kebab-pf')).toBeInTheDocument();
      });
    });
  });
});
