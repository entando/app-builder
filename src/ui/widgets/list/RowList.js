import React from 'react';
import PropTypes from 'prop-types';
import WidgetListRow from 'ui/widgets/list/WidgetListRow';

export const renderRow = item => (
  <WidgetListRow
    key={item.code}
    name={item.name}
    code={item.code}
    used={item.used}
  />
);

const RowList = ({ tableRow }) =>
  (
    tableRow.map(item => (
      renderRow(item)
    )));
WidgetListRow.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
};

export default RowList;
