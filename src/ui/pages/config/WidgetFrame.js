import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import { WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED } from 'state/page-config/const';


class WidgetFrame extends Component {
  render() {
    const {
      widgetName, widgetHasConfig, widgetStatus, frameId, frameName, frameIsMainFrame,
      onClickDelete, connectDragSource, connectDropTarget, isOver,
    } = this.props;

    let actionsMenu = null;
    if (widgetStatus !== WIDGET_STATUS_REMOVED) {
      const configMenuItems = widgetHasConfig ?
        [
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
        ] :
        null;

      actionsMenu = (
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
      );
    }

    const classNameAr = ['WidgetFrame'];
    if (isOver) {
      classNameAr.push('WidgetFrame--drag-hover');
    }
    if (frameIsMainFrame) {
      classNameAr.push('WidgetFrame--main-frame');
    }
    switch (widgetStatus) {
      case WIDGET_STATUS_DIFF: classNameAr.push('WidgetFrame--status-diff'); break;
      case WIDGET_STATUS_MATCH: classNameAr.push('WidgetFrame--status-match'); break;
      case WIDGET_STATUS_REMOVED: classNameAr.push('WidgetFrame--status-removed'); break;
      default: break;
    }
    let component = (
      <div className={classNameAr.join(' ')}>
        <div className="WidgetFrame__content">
          <div className="WidgetFrame__frame-name">{frameName}</div>
          { actionsMenu }

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
  frameIsMainFrame: PropTypes.bool.isRequired,
  widgetName: PropTypes.string.isRequired,
  widgetHasConfig: PropTypes.bool,
  widgetStatus: PropTypes.oneOf([WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED]),

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
  widgetStatus: WIDGET_STATUS_MATCH,
  frameId: null,
  widgetId: null,
  connectDragSource: null,
  connectDropTarget: null,
  isOver: false,
};


export default WidgetFrame;
