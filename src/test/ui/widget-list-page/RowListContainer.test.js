import 'test/enzyme-init';

import { mapStateToProps } from 'ui/widget-list-page/RowListContainer';

jest.unmock('ui/widget-list-page/RowListContainer');

const TEST_STATE = {
  widgetList: {
    tableRow: [],
  },
};

it('maps hidden property state with activistream.hidden', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ tableRow: { tableRow: [] } });
});
