import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LabelListMenuActions from 'ui/labels/list/LabelListMenuActions';
import DeleteLabelModalContainer from 'ui/labels/common/DeleteLabelModalContainer';

const LabelsTable = ({
  langName, labels, onClickDelete,
}) => (
  <div className="LabelsTable">
    <table className="LabelsTable__table table table-striped table-bordered table-hover no-mb">
      <thead>
        <tr>
          <th className="LabelsTable__th-lg"><FormattedMessage id="app.code" /></th>
          <th className="LabelsTable__th-lg">{ langName }</th>
          <th className="LabelsTable__th-xs text-center"><FormattedMessage id="app.actions" /></th>
        </tr>
      </thead>
      <tbody>
        {labels.map(label => (
          <tr
            key={`label-row-${label.key}`}
            className="LabelsTable__label-row"
          >
            <td>{label.key}</td>
            <td>{label.value}</td>
            <td className="text-center">
              <LabelListMenuActions code={label.key} onClickDelete={onClickDelete} />
            </td>
          </tr>
          ))}
      </tbody>
    </table>
    <DeleteLabelModalContainer />
  </div>
);
LabelsTable.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
  langName: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
};

LabelsTable.defaultProps = {
  onClickDelete: null,
};

export default LabelsTable;
