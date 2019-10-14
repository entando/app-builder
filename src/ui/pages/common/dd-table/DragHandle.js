import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';

// Specifies the drag source contract.
export const dragSource = {
  canDrag() {
    return true;
  },

  isDragging() {
    return true;
  },

  beginDrag(props, monitor, component) {
    component.onDragBegin(props);
    // Return the data describing the dragged item
    return component.getRowData();
  },

  endDrag(props, monitor, component) {
    component.onDragEnd(props);
  },
};


// Specifies which props to inject into the component
export const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class DragHandle extends Component {
  constructor(props, context) {
    super(props);
    if (!context || !context.onDragBegin || !context.onDragEnd || !context.rowData) {
      // eslint-disable-next-line no-console
      console.error(`Warning: ${DragHandle.displayName} should only be used inside DDTable.Tr!`);
    }
  }
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  onDragBegin() {
    this.context.onDragBegin(this.context.rowData);
  }

  onDragEnd() {
    this.context.onDragEnd(this.context.rowData);
  }

  getRowData() {
    return this.context.rowData;
  }

  render() {
    const { connectDragSource, children } = this.props;
    try {
      return connectDragSource(React.Children.only(children));
    } catch (e) {
      return connectDragSource((
        <button>
          <i className="fa fa-ellipsis-v" />
          &nbsp;
          <i className="fa fa-ellipsis-v" />
        </button>
      ));
    }
  }
}

DragHandle.displayName = 'DDTable.Handle';

DragHandle.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  children: PropTypes.node,
};

DragHandle.defaultProps = {
  children: (
    <button>
      <i className="fa fa-ellipsis-v" />
      &nbsp;
      <i className="fa fa-ellipsis-v" />
    </button>
  ),
};

DragHandle.contextTypes = {
  onDragBegin: PropTypes.func,
  onDragEnd: PropTypes.func,
  rowData: PropTypes.shape({}),
};

export default DragSource('DDTable', dragSource, collect)(DragHandle);
