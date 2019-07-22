import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import LinkMenuItem from 'ui/common/LinkMenuItem';
import { ROUTE_DATA_TYPE_EDIT } from 'app-init/router';
import { routeConverter } from 'helpers/routeConverter';

const DataTypeListMenuActions = ({ code, onClickDelete, onClickReload }) => {
  const editLabel = (
    <FormattedMessage id="app.edit" values={{ code }} />
  );
  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      <LinkMenuItem
        id={`dataType-${code}`}
        to={routeConverter(ROUTE_DATA_TYPE_EDIT, { datatypeCode: code })}
        label={editLabel}
        className="DataTypeListMenuAction__menu-item-edit"
      />
      <MenuItem
        className="DataTypeListMenuAction__menu-item-reload"
        onClick={() => onClickReload(code)}
      >
        <FormattedMessage id="app.reload" />
      </MenuItem>
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
  onClickReload: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default DataTypeListMenuActions;
