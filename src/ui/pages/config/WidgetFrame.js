import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

class WidgetFrame extends Component {
  render() {
    const {
      widget, frame, onClickDelete, connectDragSource, connectDropTarget, isOver,
    } = this.props;
    const classNameAr = ['WidgetFrame'];
    if (isOver) {
      classNameAr.push('WidgetFrame--drag-hover');
    }
    let component = (
      <div className={classNameAr.join(' ')}>
        <div className="WidgetFrame__content">
          <div className="WidgetFrame__frame-name">{frame.descr}</div>
          <DropdownKebab
            id="WidgetFrame__menu-button"
            className="WidgetFrame__menu-button"
            pullRight
          >
            <MenuItem>
              <FormattedMessage id="app.details" />
            </MenuItem>
            <MenuItem
              className="WidgetFrame__delete-btn"
              onClick={() => onClickDelete && onClickDelete(frame.pos)}
            >
              <FormattedMessage id="app.delete" />
            </MenuItem>
          </DropdownKebab>

          <div className="WidgetFrame__descriptor">
            <i className="WidgetFrame__icon fa fa-puzzle-piece" />
            { widget.name }
          </div>
        </div>
      </div>
    );

    if (connectDragSource) {
      component = connectDragSource(component);
    }
    if (connectDropTarget) {
      component = connectDropTarget(component);
    }
    return component;
  }
}


WidgetFrame.propTypes = {

  frame: PropTypes.shape({
    pos: PropTypes.number.isRequired,
    descr: PropTypes.string.isRequired,
  }).isRequired,

  widget: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,

  onClickDelete: PropTypes.func,

  // react-dnd
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
};

WidgetFrame.defaultProps = {
  onClickDelete: null,
  connectDragSource: null,
  connectDropTarget: null,
  isOver: false,
};


export default WidgetFrame;
