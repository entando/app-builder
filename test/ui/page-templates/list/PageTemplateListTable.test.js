import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, cleanup, screen, within } from '@testing-library/react';
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
afterEach(cleanup);
describe('PageTemplateListTable', () => {
  it('renders without crashing & it calls onWillMount', () => {
    renderComponent();
    expect(screen.getByText('Actions')).toBeInTheDocument();
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
    renderComponent();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('has a table header and body', () => {
    renderComponent();
    const rowgroups = screen.queryAllByRole('rowgroup');
    expect(rowgroups).toHaveLength(2);
  });

  it('has no rows', () => {
    renderComponent();
    const [, tbody] = screen.queryAllByRole('rowgroup');
    expect(tbody).toBeEmptyDOMElement();
  });

  it('has a paginator', () => {
    renderComponent();
    expect(screen.getByText('per page')).toBeInTheDocument();
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
    beforeEach(() => {
      renderComponent({ pageTemplates: PAGE_TEMPLATES_LIST });
    });

    it('has as many rows as the page templates count', () => {
      const [, tbody] = screen.queryAllByRole('rowgroup');
      expect(within(tbody).queryAllByRole('row')).toHaveLength(PAGE_TEMPLATES_LIST.length);
    });

    it('has a menu in the action column of each row', () => {
      const [, tbody] = screen.queryAllByRole('rowgroup');
      within(tbody).queryAllByRole('row').forEach((tr) => {
        expect(within(tr).getByRole('menu')).toBeInTheDocument();
      });
    });
  });
});
