import React from 'react';
import PropTypes from 'prop-types';
import WidgetListActionToggle from 'ui/widget-list-page/WidgetListActionToggle';

const WidgetListRow = (props) => {
  const { name, code, used } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{code}</td>
      <td>{used}</td>
      <td><WidgetListActionToggle /></td>
    </tr>
  );
};

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
};

export default WidgetListRow;
