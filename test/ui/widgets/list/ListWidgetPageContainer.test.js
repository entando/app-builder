import 'test/enzyme-init';
import { getLoading } from 'state/loading/selectors';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/list/ListWidgetPageContainer';
import { fetchWidgetList } from 'state/widgets/actions';
import { getTypologyWidgetList } from 'state/widgets/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/widgets/list/DeleteWidgetModal';
import { WIDGET, LIST, WIDGETS_MAP, WIDGET_ONE_LIST } from 'test/mocks/widgets';

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));
getLoading.mockReturnValue(false);

jest.mock('state/widgets/selectors', () => ({
  getTypologyWidgetList: jest.fn(),
}));

getTypologyWidgetList.mockReturnValue(WIDGET_ONE_LIST);

jest.mock('state/widgets/actions', () => ({
  fetchWidgetList: jest.fn(),
  sendDeleteWidgets: jest.fn(),

}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));


const dispatchMock = jest.fn();

const STATE_MOCK = {
  widgets: {
    list: LIST,
    map: WIDGETS_MAP,
    selected: WIDGET,
  },
};

describe('ui/widgets/list/ListWidgetPageContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, {});
    });

    it('verify that onWillMount and onDelete are defined', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onDelete).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchWidgetList).toHaveBeenCalled();
    });

    it('should dispatch an action if onDelete is called', () => {
      expect(props.onDelete).toBeDefined();
      props.onDelete(WIDGET);
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'widget', code: WIDGET });
    });
  });
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps(STATE_MOCK);
    });

    it('maps widgetList property from state', () => {
      props = mapStateToProps(STATE_MOCK);
      expect(props).toHaveProperty('widgetList', WIDGET_ONE_LIST);
    });
  });
});
