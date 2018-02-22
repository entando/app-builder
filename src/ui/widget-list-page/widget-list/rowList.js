import React from 'react';
import PropTypes from 'prop-types';
import WidgetListRow from 'ui/widget-list-page/WidgetListRow';


const rowList = ({ tableRow }) => (
  tableRow.map(item => (
    <WidgetListRow
      id={item.name}
      code={item.code}
      notification={item.used}
    />

  )));

WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
};

export default rowList;
