import React from 'react';
import PropTypes from 'prop-types';
import DataModelListMenuActions from 'ui/data/data-model/list/DataModelListMenuActions';

const DataModelListRow = (props) => {
  const { descr, type, modelId } = props;
  return (
    <tr className="DataModelListRow">
      <td className="DataModelListRow__td">{descr}</td>
      <td className="DataModelListRow__td text-center">{type}</td>
      <td className="DataModelListRow__td text-center">{modelId}</td>
      <td className="DataModelListRow__td text-center"><DataModelListMenuActions /></td>
    </tr>
  );
};

DataModelListRow.propTypes = {
  type: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
};

export default DataModelListRow;
