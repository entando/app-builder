import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';
import LabelListMenuActions from 'ui/labels/list/LabelListMenuActions';
import DeleteLabelModalContainer from 'ui/labels/common/DeleteLabelModalContainer';

const LabelsTable = ({
  langName, labels, onClickDelete, loading,
}) => (
  <table className="LabelsTable table table-striped table-bordered table-hover no-mb">
    <Spinner loading={!!loading}>
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
      <DeleteLabelModalContainer />
    </Spinner>
  </table>
);
LabelsTable.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
  langName: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
  loading: PropTypes.bool,
};

LabelsTable.defaultProps = {
  onClickDelete: null,
  loading: false,
};

export default LabelsTable;
