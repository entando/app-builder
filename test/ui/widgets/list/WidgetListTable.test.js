import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, within, cleanup } from '@testing-library/react';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

import { WIDGET_LIST } from 'test/mocks/widgets';
import { WidgetListTableBody as WidgetListTable } from 'ui/widgets/list/WidgetListTable';

const onDelete = jest.fn();
const WIDGETS = WIDGET_LIST.payload;

const props = {
  title: 'widgets',
  widgetList: WIDGETS,
  locale: 'en',
  onDelete,
};

jest.unmock('react-redux');

const renderComponent = (addProps = {}) =>
  render(mockRenderWithIntlAndStore(<WidgetListTable {...props} {...addProps} />));

afterEach(cleanup);

describe('WidgetListTable', () => {
  beforeEach(renderComponent);
  it('renders component without crashing', () => {
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders WidgetSectionTitle sub component', () => {
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('renders table header', () => {
    const [thead] = screen.queryAllByRole('rowgroup');
    expect(thead).toBeInTheDocument();
  });

  it('renders WidgetListRows', () => {
    const [, tbody] = screen.queryAllByRole('rowgroup');
    expect(tbody).toBeInTheDocument();
    expect(within(tbody).queryAllByRole('row')).toHaveLength(WIDGETS.length);
  });

  it('does not render WidgetListRow', () => {
    cleanup();
    renderComponent({ widgetList: [] });
    const [, tbody] = screen.queryAllByRole('rowgroup');
    expect(tbody).toBeInTheDocument();
    expect(tbody).toBeEmptyDOMElement();
  });
});
