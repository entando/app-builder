import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';


const LabelsTable = ({
  langName, labels, onClickEditLabel, onClickDeleteLabel,
}) => {
  const renderActionMenu = labelKey => (
    <DropdownKebab id="labels-action-menu" pullRight>
      <MenuItem
        className="LabelsTable__edit-btn"
        onClick={() => (onClickEditLabel && onClickEditLabel(labelKey))}
      >
        <FormattedMessage id="app.edit" />
      </MenuItem>
      <MenuItem
        className="LabelsTable__delete-btn"
        onClick={() => (onClickDeleteLabel && onClickDeleteLabel(labelKey))}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    </DropdownKebab>
  );

  return (
    <table className="LabelsTable table table-striped table-bordered table-hover no-mb">
      <thead>
        <tr>
          <th width="47%"><FormattedMessage id="app.code" /></th>
          <th width="47%">{ langName }</th>
          <th width="6%" className="text-center"><FormattedMessage id="app.actions" /></th>
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
            <td className="text-center">{renderActionMenu(label.key)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

LabelsTable.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
  langName: PropTypes.string.isRequired,
  onClickEditLabel: PropTypes.func,
  onClickDeleteLabel: PropTypes.func,
};

LabelsTable.defaultProps = {
  onClickEditLabel: null,
  onClickDeleteLabel: null,
};

export default LabelsTable;
