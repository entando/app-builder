import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { ROUTE_ROLE_EDIT, ROUTE_ROLE_DETAIL } from 'app-init/router';
import { TEST_ID_ROLE_LIST_TABLE } from 'ui/test-const/role-test-const';

const RoleListMenuActions = ({ onClickDelete, code }) => {
  const editLabel = <FormattedMessage id="app.edit" />;
  const detailsLabel = <FormattedMessage id="app.details" />;

  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      <LinkMenuItem
        id={`detail-${code}`}
        to={routeConverter(ROUTE_ROLE_DETAIL, { roleCode: code })}
        label={detailsLabel}
        className="RoleListMenuAction__menu-item-detail"
      />
      <LinkMenuItem
        id={`edit-${code}`}
        to={routeConverter(ROUTE_ROLE_EDIT, { roleCode: code })}
        label={editLabel}
        className="RoleListMenuAction__menu-item-edit"
      />
      <MenuItem
        className="RoleListMenuAction__menu-item-delete"
        onClick={() => onClickDelete(code)}
        data-testid={TEST_ID_ROLE_LIST_TABLE.ACTION_DELETE_ROLE}
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
