import { dropTarget, collect } from 'ui/pages/config/frameDropTarget';


const PROPS = {
  frame: 1,
  widget: 'widget_code',
};

const PROPS_WITH_ONDROP = {
  ...PROPS,
  onDrop: jest.fn(),
};

const CONNECT_DROP_TARGET = 'CONNECT_DROP_TARGET';
const IS_OVER = false;
const CAN_DROP = true;
const ITEM_TYPE = 'ITEM_TYPE';
const ITEM = {
  frameId: 2,
  widgetId: 'widget_code_2',
};

const CONNECT_MOCK = {
  dropTarget: jest.fn().mockReturnValue(CONNECT_DROP_TARGET),
};

const MONITOR_MOCK = {
  isOver: jest.fn().mockReturnValue(IS_OVER),
  canDrop: jest.fn().mockReturnValue(CAN_DROP),
  getItemType: jest.fn().mockReturnValue(ITEM_TYPE),
  getItem: jest.fn().mockReturnValue(ITEM),
};

global.console.warn = jest.fn();


describe('ui/pages/config/frameDropTarget', () => {
  beforeEach(jest.clearAllMocks);

  describe('dropTarget', () => {
    it('canDrop returns true if item.widgetId !== props.widgetId', () => {
      const result = dropTarget.canDrop(PROPS, MONITOR_MOCK);
      expect(result).toBe(true);
    });

    it('canDrop returns false if item.widget === props.widget', () => {
      MONITOR_MOCK.getItem.mockReturnValue(PROPS);
      const result = dropTarget.canDrop(PROPS, MONITOR_MOCK);
      expect(result).toBe(false);
    });

    it('drop shows a warning if the component does not receive an onDrop prop', () => {
      dropTarget.drop(PROPS, MONITOR_MOCK);
      expect(global.console.warn).toHaveBeenCalled();
      expect(global.console.warn.mock.calls[0][0]).toMatch(/onDrop/);
    });

    it('drop calls onDrop component prop if provided', () => {
      MONITOR_MOCK.getItem.mockReturnValue(ITEM);
      dropTarget.drop(PROPS_WITH_ONDROP, MONITOR_MOCK);
      expect(global.console.warn).not.toHaveBeenCalled();
      expect(PROPS_WITH_ONDROP.onDrop).toHaveBeenCalledWith({
        targetFrameId: PROPS_WITH_ONDROP.frameId,
        targetWidgetId: PROPS_WITH_ONDROP.widgetId,
        sourceFrameId: ITEM.frameId,
        sourceWidgetId: ITEM.widgetId,
      });
    });
  });

  describe('collect', () => {
    beforeEach(() => {
      collect(CONNECT_MOCK, MONITOR_MOCK);
    });

    it('returns the correct props from connect and monitor', () => {
      const props = collect(CONNECT_MOCK, MONITOR_MOCK);
      expect(props).toEqual({
        connectDropTarget: CONNECT_DROP_TARGET,
        isOver: IS_OVER,
        isOverCurrent: IS_OVER,
        canDrop: CAN_DROP,
        itemType: ITEM_TYPE,
      });
    });
  });
});
