import React from 'react';
import PropTypes from 'prop-types';


const EmptyFrame = ({ frameName, connectDropTarget, isOver }) => {
  const classNameAr = ['EmptyFrame'];
  if (isOver) {
    classNameAr.push('EmptyFrame--drag-hover');
  }
  const component = (
    <div className={classNameAr.join(' ')}>
      { frameName }
    </div>
  );
  if (connectDropTarget) {
    return connectDropTarget(component);
  }
  return component;
};


EmptyFrame.propTypes = {

  frameName: PropTypes.string.isRequired,

  // needed if it's droppable
  /* eslint-disable react/no-unused-prop-types */
  frameId: PropTypes.number, // needed when it's droppable
  /* eslint-enable react/no-unused-prop-types */

  // react-dnd
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
};

EmptyFrame.defaultProps = {
  frameId: null,
  connectDropTarget: null,
  isOver: false,
};


export default EmptyFrame;
