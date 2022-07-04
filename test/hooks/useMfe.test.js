import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import useMfe from 'hooks/useMfe';
import { getMfeById } from 'state/mfe/selectors';

import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

const mockMfe = LIST_MFE_RESPONSE_OK.find(obj => obj.id === 'example-mfe');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('state/mfe/selectors', () => ({
  ...jest.requireActual('state/mfe/selectors'),
  getMfeById: jest.fn(),
}));

useSelector.mockImplementation(callback => callback(mockMfe));
getMfeById.mockImplementation(() => mockMfe);

describe('useMfe hook', () => {
  it('should return the expected mfe data', () => {
    const { result } = renderHook(() => useMfe({ mfeId: 'example-mfe' }));
    const { assetLoading, mfe, hasError } = result.current;

    expect(assetLoading).toBe(true);
    expect(mfe).toBe(mockMfe);
    expect(hasError).toBe(false);
  });
});
