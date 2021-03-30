import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, within, cleanup } from '@testing-library/react';

import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';
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

const renderComponent = (addProps = {}) => render(mockRenderWithIntlAndStore(
  <FragmentListTable page={1} pageSize={1} totalItems={1} {...addProps} />,
  requiredState,
));

describe('FragmentListTable', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(mockRenderWithIntlAndStore(
      (
        <FragmentListTable pageSize={1} totalItems={1} />
      ), requiredState,
    ));
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(mockRenderWithIntlAndStore(
      (
        <FragmentListTable page={1} totalItems={1} />
      ), requiredState,
    ));
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
    renderComponent();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('has a table header', () => {
    renderComponent();
    const thead = screen.queryByRole('columnheader').closest('thead');
    expect(thead).toBeInTheDocument();
  });

  it('has no rows', () => {
    renderComponent();
    const tbody = screen.queryAllByRole('rowgroup')[1];
    expect(tbody).toBeInTheDocument();
    expect(within(tbody).queryByRole('menu')).not.toBeInTheDocument();
  });

  describe('with fragments', () => {
    beforeEach(() => {
      renderComponent({ fragments });
    });

    it('has two rows if there are two fragments', () => {
      const tbody = screen.queryAllByRole('rowgroup')[1];
      expect(tbody).toBeInTheDocument();
      expect(within(tbody).queryAllByRole('row')).toHaveLength(fragments.length);
    });

    it('has a menu in the action column of each row', () => {
      const tbody = screen.queryAllByRole('rowgroup')[1];
      within(tbody).queryAllByRole('row').forEach((tr) => {
        expect(within(tr).getByRole('menu')).toBeInTheDocument();
      });
    });
  });

  it('has a paginator', () => {
    renderComponent();
    expect(screen.getByText('per page')).toBeInTheDocument();
  });
});
