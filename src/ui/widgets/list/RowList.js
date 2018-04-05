import React from 'react';
import PropTypes from 'prop-types';
import WidgetListRow from 'ui/widgets/list/WidgetListRow';


const RowList = ({ tableRow, locale }) =>
  (
    tableRow.map(item => (
      <WidgetListRow
        key={item.code}
        name={item.titles[locale]}
        code={item.code}
        used={item.used}
      />
    )));

RowList.propTypes = {
  tableRow: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    user: PropTypes.bool,
    titles: PropTypes.shape({
      en: PropTypes.string,
      it: PropTypes.string,
    }),
  })).isRequired,
  locale: PropTypes.string,
};

export default RowList;
