import 'test/enzyme-init';

import { WIDGET_LIST } from 'test/mocks/widgets';
import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/list/RowListContainer';
import { getListWidget } from 'state/widgets/selectors';

jest.unmock('ui/widgets/list/RowListContainer');

jest.mock('state/widgets/selectors', () => (
  {
    getListWidget: jest.fn(),
  }
));

getListWidget.mockReturnValue(WIDGET_LIST.payload);

const dispatchMock = jest.fn();

const TEST_STATE = {
  widgets: {
    tableRow: WIDGET_LIST.payload,
  },
};

describe('ui/list/RowListContainer', () => {
  describe('mapStateToProps', () => {
    it('verify maps tableRow property', () => {
      expect(mapStateToProps(TEST_STATE)).toEqual({ tableRow: getListWidget(TEST_STATE) });
    });
  });
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onDelete).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onDelete('');
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
