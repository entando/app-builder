import { mapDispatchToProps } from 'ui/pages/config/DroppableEmptyFrame';

import { configOrUpdatePageWidget } from 'state/page-config/actions';

jest.mock('ui/pages/config/frameDragSource', () => jest.fn().mockImplementation(arg => arg));
jest.mock('ui/pages/config/frameDropTarget', () => jest.fn().mockImplementation(arg => arg));
jest.mock('ui/pages/config/WidgetFrame', () => () => 'span');
jest.mock('state/page-config/actions', () => ({
  configOrUpdatePageWidget: jest.fn().mockReturnValue('configOrUpdatePageWidget__result'),
}));

const SOURCE_WIDGET_ID = 'widget_code';

const SOURCE_FRAME_ID = 1;
const TARGET_FRAME_ID = 2;

const ownProps = {
  match: {
    params: {
      pageCode: 'pageCode',
    },
  },
};

describe('ui/pages/config/DroppableEmptyFrame', () => {
  beforeEach(jest.clearAllMocks);
  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, ownProps);
    });

    it('onDrop will dispatch "configOrUpdatePageWidget" action', () => {
      props.onDrop({
        sourceWidgetId: SOURCE_WIDGET_ID,
        sourceFrameId: SOURCE_FRAME_ID,
        targetFrameId: TARGET_FRAME_ID,
      });
      expect(configOrUpdatePageWidget)
        .toHaveBeenCalledWith(SOURCE_WIDGET_ID, SOURCE_FRAME_ID, TARGET_FRAME_ID, 'pageCode');
      expect(dispatchMock).toHaveBeenCalledWith('configOrUpdatePageWidget__result');
    });
  });
});
