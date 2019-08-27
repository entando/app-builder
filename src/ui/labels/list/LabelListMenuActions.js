import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { ROUTE_LABEL_EDIT } from 'app-init/router';

const LabelListMenuActions = ({ onClickDelete, code }) => {
  const editLabel = <FormattedMessage id="app.edit" />;

  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      <LinkMenuItem
        id={`edit-${code}`}
        to={routeConverter(ROUTE_LABEL_EDIT, { labelCode: code })}
        label={editLabel}
        className="LabelListMenuAction__menu-item-edit"
      />
      <MenuItem
        className="LabelListMenuAction__menu-item-delete"
        onClick={() => onClickDelete(code)}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    </DropdownKebab>
  );
};

LabelListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

LabelListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default LabelListMenuActions;
