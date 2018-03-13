import { DropTarget } from 'react-dnd';

import { DND_TYPE_PAGE_CONFIG } from 'ui/pages/config/const';


export const dropTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.widget !== props.widget;
  },

  drop(props, monitor) {
    if (props.onDrop) {
      const item = monitor.getItem();
      props.onDrop({
        targetFrame: props.frame,
        targetWidget: props.widget,
        sourceFrame: item.frame,
        sourceWidget: item.widget,
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
