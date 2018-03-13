import 'test/enzyme-init';

import { WIDGET_LIST } from 'test/mocks/widgetList';
import { mapStateToProps } from 'ui/widgets/list/RowListContainer';
import { getListWidget } from 'state/widgets/selectors';

jest.unmock('ui/widgets/list/RowListContainer');

jest.mock('state/widgets/selectors', () => (
  {
    getListWidget: jest.fn(),
  }
));

getListWidget.mockReturnValue(WIDGET_LIST.payload);

const TEST_STATE = {
  widgets: {
    tableRow: WIDGET_LIST.payload,
  },
};

it('verify maps tableRow property', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ tableRow: getListWidget(TEST_STATE) });
});
