import 'test/enzyme-init';

import { mapStateToProps } from 'ui/widgets/list/RowListContainer';

jest.unmock('ui/widgets/list/RowListContainer');

const TEST_STATE = {
  widgetList: {
    tableRow: [],
  },
};

describe('RowListContainer', () => {
  it('maps hidden property state with activistream.hidden', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ tableRow: { tableRow: [] } });
  });
});
