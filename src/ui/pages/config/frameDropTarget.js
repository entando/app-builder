import { DropTarget } from 'react-dnd';

import { DND_TYPE_PAGE_CONFIG } from 'ui/pages/config/const';


export const dropTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.widgetId !== props.widgetId;
  },

  drop(props, monitor) {
    if (props.onDrop) {
      const item = monitor.getItem();
      props.onDrop({
        targetFrameId: props.frameId,
        targetWidgetId: props.widgetId,
        sourceFrameId: item.frameId,
        sourceWidgetId: item.widgetId,
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn(`A component wrapped with frameDropTarget needs to receive the "onDrop" 
        function prop`);
    }
  },
};

export const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
});


export default DropTarget(DND_TYPE_PAGE_CONFIG, dropTarget, collect);
