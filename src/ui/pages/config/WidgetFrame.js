import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

class WidgetFrame extends Component {
  render() {
    const {
      widgetName, widgetHasConfig, frameId, frameName, onClickDelete, connectDragSource,
      connectDropTarget, isOver,
    } = this.props;

    let configMenuItems = null;
    if (widgetHasConfig) {
      configMenuItems = [
        (
          <MenuItem key="menu-settings" className="WidgetFrame__settings-btn">
            <FormattedMessage id="app.settings" />
          </MenuItem>
        ),
        (
          <MenuItem key="menu-api" className="WidgetFrame__api-btn">
            <FormattedMessage id="app.api" />
          </MenuItem>
        ),
        (
          <MenuItem key="menu-saveasnew" className="WidgetFrame__save-btn">
            <FormattedMessage id="pageConfig.saveAsNewWidget" />
          </MenuItem>
        ),
      ];
    }

    const classNameAr = ['WidgetFrame'];
    if (isOver) {
      classNameAr.push('WidgetFrame--drag-hover');
    }
    let component = (
      <div className={classNameAr.join(' ')}>
        <div className="WidgetFrame__content">
          <div className="WidgetFrame__frame-name">{frameName}</div>
          <DropdownKebab
            id="WidgetFrame__menu-button"
            className="WidgetFrame__menu-button"
            pullRight
          >
            <MenuItem>
              <FormattedMessage id="app.details" />
            </MenuItem>

            { configMenuItems }

            <MenuItem
              className="WidgetFrame__delete-btn"
              onClick={() => onClickDelete && onClickDelete(frameId)}
            >
              <FormattedMessage id="app.delete" />
            </MenuItem>
          </DropdownKebab>

          <div className="WidgetFrame__descriptor">
            <i className="WidgetFrame__icon fa fa-puzzle-piece" />
            { widgetName }
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

  frameName: PropTypes.string.isRequired,
  widgetName: PropTypes.string.isRequired,
  widgetHasConfig: PropTypes.bool,

  /* eslint-disable react/no-unused-prop-types */
  frameId: PropTypes.number, // needed when it's droppable
  widgetId: PropTypes.string, // needed when it's draggable
  /* eslint-enable react/no-unused-prop-types */

  onClickDelete: PropTypes.func,

  // react-dnd
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
};

WidgetFrame.defaultProps = {
  onClickDelete: null,
  widgetHasConfig: false,
  frameId: null,
  widgetId: null,
  connectDragSource: null,
  connectDropTarget: null,
  isOver: false,
};


export default WidgetFrame;
