import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { ROUTE_CATEGORY_EDIT, ROUTE_CATEGORY_DETAIL } from 'app-init/router';

const CategoryListMenuActions = ({ onClickAdd, onClickDelete, code }) => (
  <DropdownKebab pullRight id={`${code}-actions`}>
    <LinkMenuItem
      id={`detail-${code}`}
      to={routeConverter(ROUTE_CATEGORY_DETAIL, { categoryCode: code })}
      label={<FormattedMessage id="app.details" />}
      className="CategoryListMenuAction__menu-item-details"
    />
    <MenuItem
      className="CategoryListMenuAction__menu-item-add"
      onClick={() => onClickAdd(code)}
    >
      <FormattedMessage id="app.add" />
    </MenuItem>
    <LinkMenuItem
      id={`edit-${code}`}
      to={routeConverter(ROUTE_CATEGORY_EDIT, { categoryCode: code })}
      label={<FormattedMessage id="app.edit" />}
      className="CategoryListMenuAction__menu-item-edit"
    />
    <MenuItem
      className="CategoryListMenuAction__menu-item-delete"
      onClick={() => onClickDelete(code)}
    >
      <FormattedMessage id="app.delete" />
    </MenuItem>
  </DropdownKebab>
);

CategoryListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  onClickAdd: PropTypes.func,
  code: PropTypes.string.isRequired,
};

CategoryListMenuActions.defaultProps = {
  onClickDelete: null,
  onClickAdd: null,
};

export default CategoryListMenuActions;
