import { DragSource } from 'react-dnd';

import { DND_TYPE_PAGE_CONFIG } from 'ui/pages/config/const';


export const dragSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return {
      // widget: props.widget,
      // frame: props.frame,
      widgetId: props.widgetId,
      frameId: props.frameId,
    };
  },
};

export const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

export default DragSource(DND_TYPE_PAGE_CONFIG, dragSource, collect);
