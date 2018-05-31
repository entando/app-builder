import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from 'frontend-common-components';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_DATA_TYPE_EDIT } from 'app-init/router';

const DataTypeListMenuActions = ({ code, onClickDelete }) => {
  const editLabel = (
    <FormattedMessage id="app.edit" values={{ code }} />
  );
  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      <LinkMenuItem
        id={`dataType-${code}`}
        route={ROUTE_DATA_TYPE_EDIT}
        params={{ datatypeCode: code }}
        label={editLabel}
        className="DataTypeListMenuAction__menu-item-edit"
      />
      <MenuItem
        className="DataTypeListMenuAction__menu-item-delete"
        onClick={() => onClickDelete(code)}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    </DropdownKebab>
  );
};

DataTypeListMenuActions.propTypes = {
  onClickDelete: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default DataTypeListMenuActions;
