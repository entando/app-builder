import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { mockRenderWithIntlAndStore } from 'test/testUtils';
import FragmentListTable from 'ui/fragments/list/FragmentListTable';

const fragments = [
  {
    code: 'myCode',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
  {
    code: 'myCode2',
    isLocked: false,
    widgetType: {
      code: 'widgetcode',
      title: 'Widget Title',
    },
    pluginCode: 'pluginCode',
  },
];

jest.unmock('react-redux');

const requiredState = {
  modal: { info: {}, visibleModal: '' },
};

const renderComponent = (addProps = {}) => render(
  mockRenderWithIntlAndStore(
    <FragmentListTable page={1} pageSize={1} totalItems={1} {...addProps} />,
    requiredState,
  ),
);

describe('FragmentListTable', () => {
  it('renders without crashing', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.FragmentListTable')).toBeInTheDocument();
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(mockRenderWithIntlAndStore(<FragmentListTable pageSize={1} totalItems={1} />, requiredState));
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(mockRenderWithIntlAndStore(<FragmentListTable page={1} totalItems={1} />, requiredState));
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(mockRenderWithIntlAndStore(<FragmentListTable pageSize={1} page={1} />, requiredState));
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
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
    expect(tbody.querySelectorAll('tr')).toHaveLength(0);
  });

  describe('with fragments', () => {
    it('has two rows if there are two fragments', () => {
      const { container } = renderComponent({ fragments });
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
      expect(tbody.querySelectorAll('tr')).toHaveLength(2);
      expect(tbody.querySelectorAll('.dropdown.btn-group.dropdown-kebab-pf')).toHaveLength(2);
    });

    it('has a menu in the action column of each row', () => {
      const { container } = renderComponent({ fragments });
      container.querySelectorAll('tbody tr').forEach((tr) => {
        expect(tr.querySelector('.dropdown.dropdown-kebab-pf')).toBeInTheDocument();
      });
    });
  });

  it('has a paginator', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.table-view-pf-pagination')).toBeInTheDocument();
  });
});
