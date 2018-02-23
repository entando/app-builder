
import { getWidgetName, getWidgetValues } from 'state/widget-form/selectors';

const TEST_STATE = {
  widgetForm: { widgetValues: { name: 'test_widget' } },
};

it('verify getWidgetValues selector', () => {
  expect(getWidgetValues(TEST_STATE)).toBeDefined();
});

it('verify getWidgetName selector', () => {
  expect(getWidgetName(TEST_STATE)).toBeDefined();
});
