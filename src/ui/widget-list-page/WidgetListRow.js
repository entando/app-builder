import React from 'react';
// import PropTypes from 'prop-types';
import WidgetListActionToggle from 'ui/widget-list-page/WidgetListActionToggle';

const WidgetListRow = () => (
  <tr>
    <td>name</td>
    <td>code</td>
    <td>used</td>
    <td><WidgetListActionToggle /></td>
  </tr>
);

export default WidgetListRow;
