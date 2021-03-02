import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

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

const renderComponent = (addProps = {}) => render(
  mockRenderWithIntlAndStore(
    <WidgetListTable {...props} {...addProps} />,
  ),
);

describe('WidgetListTable', () => {
  it('renders component without crashing', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.WidgetListTable')).toBeInTheDocument();
  });

  it('renders WidgetSectionTitle sub component', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.WidgetSectionTitle')).toBeInTheDocument();
  });

  it('renders table header', () => {
    const { container } = renderComponent();
    expect(container.querySelector('table thead tr th')).toBeInTheDocument();
  });

  it('renders WidgetListRows', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.WidgetListRow')).toBeInTheDocument();
    expect(container.querySelectorAll('.WidgetListRow')).toHaveLength(8);
  });

  it('does not render WidgetListRow', () => {
    const { container } = renderComponent({ widgetList: [] });
    expect(container.querySelector('.WidgetListRow')).not.toBeInTheDocument();
  });
});
