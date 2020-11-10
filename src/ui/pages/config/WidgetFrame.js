import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { ROUTE_WIDGET_DETAIL, ROUTE_WIDGET_EDIT } from 'app-init/router';
import { WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED } from 'state/page-config/const';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';


class WidgetFrame extends Component {
  render() {
    const {
      widgetId, widgetName, widgetHasConfig, widgetStatus, frameId, frameName, frameIsMainFrame,
      onClickDelete, connectDragSource, connectDropTarget, isOver, onClickSettings, onClickSaveAs,
      widgetAction, widgetHasConfigForm,
    } = this.props;

    let actionsMenu = null;
    if (widgetStatus !== WIDGET_STATUS_REMOVED) {
      const configMenuItems = widgetHasConfig && (widgetAction || widgetHasConfigForm) ?
        [
          (
            <MenuItem
              key="menu-settings"
              className="WidgetFrame__settings-btn"
              onClick={() => onClickSettings && onClickSettings(frameId)}
            >
              <FormattedMessage id="app.settings" />
            </MenuItem>
          ),
        ] :
        null;
      const cloneMenuItems = widgetHasConfig && widgetAction ? [
        (
          <MenuItem
            key="menu-saveAs"
            className="WidgetFrame__saveAs-btn"
            onClick={() => onClickSaveAs && onClickSaveAs({
              widgetId,
              widgetHasConfig,
              frameId,
              widgetAction,
            })}
          >
            <FormattedMessage id="app.saveAs" />
          </MenuItem>
        ),
      ] : null;

      actionsMenu = (
        <DropdownKebab
          id="WidgetFrame__menu-button"
          className="WidgetFrame__menu-button"
          pullRight
        >
          <li>
            <Link
              key={widgetId}
              id={`detail-widget-${widgetId}`}
              to={routeConverter(ROUTE_WIDGET_DETAIL, { widgetCode: widgetId })}
            >
              <FormattedMessage id="app.details" />
            </Link>
          </li>
          <li>
            <Link
              key={widgetId}
              id={`edit-widget-${widgetId}`}
              to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: widgetId })}
            >
              <FormattedMessage id="app.edit" />
            </Link>
          </li>

          { configMenuItems }

          {cloneMenuItems}

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
            <WidgetIcon widgetId={widgetId} />
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
  widgetAction: PropTypes.string,
  widgetHasConfigForm: PropTypes.bool,

  /* eslint-disable react/no-unused-prop-types */
  frameId: PropTypes.number, // needed when it's droppable
  widgetId: PropTypes.string, // needed when it's draggable
  /* eslint-enable react/no-unused-prop-types */

  onClickDelete: PropTypes.func,
  onClickSettings: PropTypes.func,
  onClickSaveAs: PropTypes.func,

  // react-dnd
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
};

WidgetFrame.defaultProps = {
  onClickDelete: null,
  onClickSettings: null,
  onClickSaveAs: null,
  widgetHasConfig: false,
  widgetStatus: WIDGET_STATUS_MATCH,
  frameId: null,
  widgetId: null,
  connectDragSource: null,
  connectDropTarget: null,
  isOver: false,
  widgetAction: null,
  widgetHasConfigForm: false,
};


export default WidgetFrame;
