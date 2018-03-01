import { getFragmentValues } from 'state/fragment-form/selectors';

const TEST_STATE = {
  fragmentForm: { fragmentValues: { code: 'test_fragment' } },
};

it('verify getFragmentValues selector', () => {
  expect(getFragmentValues(TEST_STATE)).toBeDefined();
});
