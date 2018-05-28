import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from 'frontend-common-components';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_PROFILE_TYPE_EDIT } from 'app-init/router';

const ProfileTypeListMenuActions = ({ onClickDelete, code }) => {
  const editLabel = (
    <FormattedMessage id="app.edit" values={{ code }} />
  );
  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      <LinkMenuItem
        id={`profileType-${code}`}
        route={ROUTE_PROFILE_TYPE_EDIT}
        params={{ profiletypeCode: code }}
        label={editLabel}
        className="ProfileTypeListMenuAction__menu-item-edit"
      />
      <MenuItem
        className="ProfileTypeListMenuAction__menu-item-reload"
      >
        <FormattedMessage id="app.reload" />
      </MenuItem>
      <MenuItem
        className="ProfileTypeListMenuAction__menu-item-delete"
        onClick={() => (onClickDelete(code))}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    </DropdownKebab>
  );
};

ProfileTypeListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

ProfileTypeListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default ProfileTypeListMenuActions;
