import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_ROLE_EDIT, ROUTE_ROLE_DETAIL } from 'app-init/router';

const RoleListMenuActions = ({ onClickDelete, code }) => {
  const editLabel = <FormattedMessage id="app.edit" />;
  const editDetails = <FormattedMessage id="app.details" />;

  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      <LinkMenuItem
        id={`detail-${code}`}
        route={ROUTE_ROLE_DETAIL}
        params={{ roleCode: code }}
        label={editDetails}
        className="RoleListMenuAction__menu-item-detail"
      />
      <LinkMenuItem
        id={`edit-${code}`}
        route={ROUTE_ROLE_EDIT}
        params={{ roleCode: code }}
        label={editLabel}
        className="RoleListMenuAction__menu-item-edit"
      />
      <MenuItem
        className="RoleListMenuAction__menu-item-delete"
        onClick={onClickDelete}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    </DropdownKebab>
  );
};

RoleListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

RoleListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default RoleListMenuActions;
