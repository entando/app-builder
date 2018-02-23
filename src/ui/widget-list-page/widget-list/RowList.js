import React from 'react';
import PropTypes from 'prop-types';
import WidgetListRow from 'ui/widget-list-page/WidgetListRow';


const RowList = ({ tableRow }) =>
  // console.log('rowList', tableRow);
  (
    tableRow.map(item => (
      <WidgetListRow
        key={item.code}
        name={item.name}
        code={item.code}
        used={item.used}
      />
    )));
WidgetListRow.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
};

export default RowList;
