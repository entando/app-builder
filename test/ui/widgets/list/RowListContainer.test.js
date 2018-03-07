import 'test/enzyme-init';

import { WIDGET_LIST } from 'test/mocks/widgetList';
import { mapStateToProps } from 'ui/widgets/list/RowListContainer';

jest.unmock('ui/widgets/list/RowListContainer');

const TEST_STATE = {
  widgets: { list: WIDGET_LIST.payload },
};

it('verify maps tableRow property', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ tableRow: WIDGET_LIST.payload });
});
