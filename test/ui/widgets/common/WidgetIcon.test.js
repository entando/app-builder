import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('WidgetIcon', () => {
  it('renders the icon in props', () => {
    const { container } = render(<WidgetIcon icon="font-awesome:fa-archive" />);
    expect(container.firstChild).toHaveClass('fa');
    expect(container.firstChild).toHaveClass('fa-archive');
  });

  it('render the icon retrieved from store', () => {
    useSelector.mockImplementation(callback => callback({
      widgets: {
        map: {
          test: {
            icon: 'font-awesome:fa-archive',
          },
        },
      },
    }));
    const { container } = render(<WidgetIcon widgetId="test" />);
    expect(container.firstChild).toHaveClass('fa');
    expect(container.firstChild).toHaveClass('fa-archive');
  });

  it('renders an icon from assets using a img element', () => {
    const { container } = render(<WidgetIcon icon="asset:my_asset" />);
    expect(container.firstChild.tagName).toBe('IMG');
    expect(container.firstChild.src.includes('my_asset.svg')).toBe(true);
  });
});
