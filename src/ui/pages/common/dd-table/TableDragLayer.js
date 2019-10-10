import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

const headerHeight = 26;

const layerStyles = {
  position: 'absolute',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: headerHeight,
  width: '100%',
  height: `calc(100% - ${headerHeight}px)`,
};

export const getItemStyles = (props, rootEl) => {
  const {
    initialOffset, differenceOffset,
  } = props;
  if (!initialOffset || !rootEl) {
    return {
      display: 'none',
    };
  }

  const x = 30;

  const parentTop = rootEl && rootEl.getBoundingClientRect().top;
  const y = (initialOffset.y - parentTop) + differenceOffset.y;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

export const collect = (monitor => ({
  item: monitor.getItem(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  differenceOffset: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging(),
}));

class TableDragLayer extends Component {
  constructor(props) {
    super(props);
    this.rootEl = null;
  }

  render() {
    const { item, isDragging, PreviewRenderer } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div className="TableDragLayer" style={layerStyles} ref={(root) => { this.rootEl = root; }}>
        <div style={getItemStyles(this.props, this.rootEl)}>
          <PreviewRenderer rowData={item} />
        </div>
      </div>
    );
  }
}

TableDragLayer.propTypes = {
  item: PropTypes.shape({}),
  isDragging: PropTypes.bool,
  PreviewRenderer: PropTypes.func.isRequired,
};

TableDragLayer.defaultProps = {
  item: null,
  isDragging: false,
};

export default DragLayer(collect)(TableDragLayer);
