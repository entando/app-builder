import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';

import WidgetIcon from 'ui/widgets/common/WidgetIcon';

const WidgetListRow = (props) => {
  const {
    name, code, used, hasConfig, onDelete, onEdit, onNewUserWidget, isSuperuser,
    isLocked,
  } = props;

  const onClickDelete = () => onDelete(code);
  const onClickEdit = () => onEdit(code);
  const onClickAddWidget = () => onNewUserWidget(code);

  return (
    <tr className="WidgetListRow">
      <td className="WidgetListRow__td ">
        <div className="list-view-pf-left">
          <WidgetIcon widgetId={code} small />
          &nbsp;&nbsp;
          <Link
            className="WidgetListRow__link"
            to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: code })}
          >
            {name}
          </Link>
        </div>
      </td>
      <td className="WidgetListRow__td ">{code}</td>
      <td className="WidgetListRow__td text-center">{used}</td>
      {isSuperuser && (
        <td className="WidgetListRow__td text-center">
          <DropdownKebab pullRight id="WidgetListRow-dropown">
            {hasConfig && (
              <MenuItem
                className="WidgetListRow__menu-item-addwidget"
                onClick={onClickAddWidget}
              >
                <FormattedMessage id="widgets.addWidget" />
              </MenuItem>
            )}
            <MenuItem
              className="WidgetListRow__menu-item-edit"
              onClick={onClickEdit}
            >
              <FormattedMessage id="app.edit" />
            </MenuItem>
            {
              !isLocked && (
                <MenuItem
                  className="WidgetListRow__menu-item-delete"
                  onClick={onClickDelete}
                >
                  <FormattedMessage id="app.delete" />
                </MenuItem>
              )
            }

          </DropdownKebab>
        </td>
      )}
    </tr>
  );
};

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
  hasConfig: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onNewUserWidget: PropTypes.func,
  isSuperuser: PropTypes.bool,
  isLocked: PropTypes.bool,
};

WidgetListRow.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
  onNewUserWidget: () => {},
  hasConfig: false,
  isSuperuser: true,
  isLocked: false,
};

export default WidgetListRow;
