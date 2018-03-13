import { dragSource, collect } from 'ui/pages/config/frameDragSource';

const PROPS = {
  frame: { pos: 1, descr: 'A Frame' },
  widget: { code: 'widget_code' },
};

const CONNECT_DRAG_SOURCE = 'CONNECT_DRAG_SOURCE';
const CONNECT_DRAG_PREVIEW = 'CONNECT_DRAG_PREVIEW';
const IS_DRAGGING = false;

const CONNECT_MOCK = {
  dragSource: jest.fn().mockReturnValue(CONNECT_DRAG_SOURCE),
  dragPreview: jest.fn().mockReturnValue(CONNECT_DRAG_PREVIEW),
};

const MONITOR_MOCK = {
  isDragging: jest.fn().mockReturnValue(IS_DRAGGING),
};


describe('ui/pages/config/frameDragSource', () => {
  beforeEach(jest.clearAllMocks);

  describe('dragSource', () => {
    it('beginDrag return the item description ("frame" and "widget" props)', () => {
      const item = dragSource.beginDrag(PROPS);
      expect(item).toEqual({
        frame: PROPS.frame,
        widget: PROPS.widget,
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
        connectDragSource: CONNECT_DRAG_SOURCE,
        connectDragPreview: CONNECT_DRAG_PREVIEW,
        isDragging: IS_DRAGGING,
      });
    });
  });
});
