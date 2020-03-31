import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';

const WidgetListRow = (props) => {
  const {
    name, code, used, onDelete, onEdit,
  } = props;

  const onClickDelete = () => {
    onDelete(code);
  };
  const onClickEdit = () => {
    onEdit(code);
  };

  return (
    <tr className="WidgetListRow">
      <td className="WidgetListRow__td ">
        <div className="list-view-pf-left">
          <span className="fa fa-puzzle-piece list-view-pf-icon-sm" />
          &nbsp;&nbsp;
          <Link to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: code })}>{name}</Link>
        </div>
      </td>
      <td className="WidgetListRow__td ">{code}</td>
      <td className="WidgetListRow__td text-center">{used}</td>
      <td className="WidgetListRow__td text-center">
        <DropdownKebab pullRight id="WidgetListRow-dropown">
          <MenuItem
            className="WidgetListRow__menu-item-edit"
            onClick={onClickEdit}
          >
            <FormattedMessage id="app.edit" />
          </MenuItem>
          <MenuItem
            className="WidgetListRow__menu-item-delete"
            onClick={onClickDelete}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        </DropdownKebab>

      </td>
    </tr>
  );
};

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

WidgetListRow.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
};

export default WidgetListRow;
