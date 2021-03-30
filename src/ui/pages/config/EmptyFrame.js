import React from 'react';
import PropTypes from 'prop-types';


const EmptyFrame = ({
  frameName, frameIsMainFrame, connectDropTarget, isOver,
}) => {
  const classNameAr = ['EmptyFrame'];
  if (isOver) {
    classNameAr.push('EmptyFrame--drag-hover');
  }
  if (frameIsMainFrame) {
    classNameAr.push('EmptyFrame--main-frame');
  }
  const component = (
    <div className={classNameAr.join(' ')} data-testid={`WidgetFrame__${frameName.replace(/\s/g, '_')}`}>
      <span className="EmptyFrame__frame-name" >{ frameName }</span>
    </div>
  );
  if (connectDropTarget) {
    return connectDropTarget(component);
  }
  return component;
};


EmptyFrame.propTypes = {

  frameName: PropTypes.string.isRequired,
  frameIsMainFrame: PropTypes.bool.isRequired,

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
