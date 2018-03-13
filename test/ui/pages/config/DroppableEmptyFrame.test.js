import { mapDispatchToProps } from 'ui/pages/config/DroppableEmptyFrame';

import { updatePageWidget } from 'state/page-config/actions';

jest.mock('ui/pages/config/frameDragSource', () => jest.fn().mockImplementation(arg => arg));
jest.mock('ui/pages/config/frameDropTarget', () => jest.fn().mockImplementation(arg => arg));
jest.mock('ui/pages/config/WidgetFrame', () => () => 'span');
jest.mock('state/page-config/actions', () => ({
  updatePageWidget: jest.fn().mockReturnValue('updatePageWidget__result'),
}));

const SOURCE_WIDGET = { code: 'sample' };

const SOURCE_FRAME = { pos: 1 };
const TARGET_FRAME = { pos: 2 };

describe('ui/pages/config/DraggableWidgetFrame', () => {
  beforeEach(jest.clearAllMocks);
  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('onDrop will dispatch "updatePageWidget" action', () => {
      props.onDrop({
        sourceWidget: SOURCE_WIDGET,
        sourceFrame: SOURCE_FRAME,
        targetFrame: TARGET_FRAME,
      });
      expect(updatePageWidget)
        .toHaveBeenCalledWith(SOURCE_WIDGET, TARGET_FRAME.pos, SOURCE_FRAME.pos);
      expect(dispatchMock).toHaveBeenCalledWith('updatePageWidget__result');
    });
  });
});
