import React from 'react';
import PropTypes from 'prop-types';


const EmptyFrame = ({ frame, connectDropTarget, isOver }) => {
  const classNameAr = ['EmptyFrame'];
  if (isOver) {
    classNameAr.push('EmptyFrame--drag-hover');
  }
  const component = (
    <div className={classNameAr.join(' ')}>
      { frame.descr }
    </div>
  );
  if (connectDropTarget) {
    return connectDropTarget(component);
  }
  return component;
};


EmptyFrame.propTypes = {

  frame: PropTypes.shape({
    pos: PropTypes.number.isRequired,
    descr: PropTypes.string.isRequired,
  }).isRequired,

  // react-dnd
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
};

EmptyFrame.defaultProps = {
  connectDropTarget: null,
  isOver: false,
};


export default EmptyFrame;
