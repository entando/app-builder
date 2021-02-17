import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithIntl } from 'test/testUtils';
import IconUploader from 'ui/widgets/common/IconUploader';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('IconUploader', () => {
  it('renders the IconUploader without value successfully', () => {
    useSelector.mockImplementation(callback => callback({
      loading: {},
    }));

    const { container, getByText } = renderWithIntl(<IconUploader label="test" />);
    expect(container.firstChild).toHaveClass('IconUploader');
    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('Icon Library')).toBeInTheDocument();
    expect(getByText('Upload')).toBeInTheDocument();
    expect(getByText('Upload your Icon from the Icon Library or your Computer')).toBeInTheDocument();
  });

  it('renders the IconUploader with value successfully', () => {
    useSelector.mockImplementation(callback => callback({
      loading: {},
      widgets: {
        map: {
          test: {
            icon: 'font-awesome:fa-archive',
          },
        },
      },
    }));

    const input = {
      value: 'font-awesome:fa-archive',
    };

    const { container, getByText } = renderWithIntl(<IconUploader label="test" input={input} />);
    expect(container.firstChild).toHaveClass('IconUploader');
    expect(getByText('test')).toBeInTheDocument();
    expect(getByText('Icon Library')).toBeInTheDocument();
    expect(getByText('Upload')).toBeInTheDocument();
    expect(getByText('fa-archive')).toBeInTheDocument();
  });
});
