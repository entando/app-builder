import { getHidden } from 'state/activity-stream/selectors';

const TEST_HIDDEN = {
  activityStream: { hidden: true },
};

it('verify getHidden selector', () => {
  expect(getHidden(TEST_HIDDEN)).toBeDefined();
  expect(getHidden(TEST_HIDDEN)).toBeTruthy();
});
