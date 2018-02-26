import React from 'react';
import PropTypes from 'prop-types';
import WidgetListMenuActions from 'ui/widget-list-page/WidgetListMenuActions';

const WidgetListRow = (props) => {
  const { name, code, used } = props;
  return (
    <tr className="WidgetListRow">
      <td className="WidgetListRow--line-height">
        <div className="list-view-pf-left">
          <span className="fa fa-puzzle-piece list-view-pf-icon-sm" />
          &nbsp;&nbsp;{name}
        </div>
      </td>
      <td className="WidgetListRow--line-height">{code}</td>
      <td className="WidgetListRow--line-height text-center">{used}</td>
      <td className="WidgetListRow--line-height text-center"><WidgetListMenuActions /></td>
    </tr>
  );
};

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.string.isRequired,
};

export default WidgetListRow;
