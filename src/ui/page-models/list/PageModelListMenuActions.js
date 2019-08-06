import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

import { history, ROUTE_PAGE_MODEL_EDIT, ROUTE_PAGE_MODEL_DETAIL } from 'app-init/router';
import { routeConverter } from 'helpers/routeConverter';


const PageModelListMenuActions = ({ onClickDelete, code }) => (
  <DropdownKebab
    className="PageModelListMenuActions"
    id={`${code}-actions`}
    pullRight
  >
    <MenuItem
      className="PageModelListMenuActions__menu-item-edit"
      onClick={() => history.push(routeConverter(ROUTE_PAGE_MODEL_EDIT, { pageModelCode: code }))}
    >
      <FormattedMessage id="app.edit" />
    </MenuItem>
    <MenuItem
      className="PageModelListMenuActions__menu-item-details"
      onClick={() => history.push(routeConverter(ROUTE_PAGE_MODEL_DETAIL, { pageModelCode: code }))}
    >
      <FormattedMessage id="app.details" />
    </MenuItem>
    <MenuItem
      className="PageModelListMenuActions__menu-item-delete"
      onClick={onClickDelete}
    >
      <FormattedMessage id="app.delete" />
    </MenuItem>
  </DropdownKebab>
);

PageModelListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

PageModelListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default PageModelListMenuActions;
