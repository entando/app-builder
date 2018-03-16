import React from 'react';
import PropTypes from 'prop-types';
import WidgetListMenuActions from 'ui/widgets/list/WidgetListMenuActions';
import { Link } from 'frontend-common-components';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';

const WidgetListRow = (props) => {
  const { name, code, used } = props;
  return (
    <tr className="WidgetListRow">
      <td className="WidgetListRow__td ">
        <div className="list-view-pf-left">
          <span className="fa fa-puzzle-piece list-view-pf-icon-sm" />
          &nbsp;&nbsp;
          <Link route={ROUTE_WIDGET_EDIT} params={{ widgetCode: code }} >{name}</Link>
        </div>
      </td>
      <td className="WidgetListRow__td ">{code}</td>
      <td className="WidgetListRow__td text-center">{used}</td>
      <td className="WidgetListRow__td text-center"><WidgetListMenuActions /></td>
    </tr>
  );
};

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
};

export default WidgetListRow;
