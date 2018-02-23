import React from 'react';
import PropTypes from 'prop-types';
import WidgetListMenuActions from 'ui/widget-list-page/WidgetListMenuActions';

const WidgetListRow = (props) => {
  const { name, code, used } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{code}</td>
      <td className="text-center">{used}</td>
      <td className="text-center"><WidgetListMenuActions /></td>
    </tr>
  );
};

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
};

export default WidgetListRow;
