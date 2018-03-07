import React from 'react';
import PropTypes from 'prop-types';
import DataModelListRow from 'ui/data-models/list/DataModelListRow';

export const renderRow = item => (
  <DataModelListRow
    key={item.type}
    descr={item.descr}
    type={item.type}
    modelId={item.modelId}
  />
);

const RowList = ({ tableRow }) => (
  tableRow.map(item => (
    renderRow(item)
  ))
);
DataModelListRow.propTypes = {
  type: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
};

export default RowList;
