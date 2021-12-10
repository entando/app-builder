import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter } from '@entando/utils';

import {
  history,
  ROUTE_PAGE_TEMPLATE_EDIT,
  ROUTE_PAGE_TEMPLATE_CLONE,
  ROUTE_PAGE_TEMPLATE_DETAIL,
} from 'app-init/router';
import { NEXT_PAGE_TEMPLATE_CODE } from 'ui/pages/common/const';


const PageTemplateListMenuActions = ({ onClickDelete, code }) => (
  <DropdownKebab
    className="PageTemplateListMenuActions"
    id={`${code}-actions`}
    pullRight
  >
    <MenuItem
      className="PageTemplateListMenuActions__menu-item-edit"
      onClick={() => (
        history.push(routeConverter(ROUTE_PAGE_TEMPLATE_EDIT, { pageTemplateCode: code }))
      )}
    >
      <FormattedMessage id="app.edit" />
    </MenuItem>
    <MenuItem
      className="PageTemplateListMenuActions__menu-item-clone"
      onClick={() => (
        history.push(routeConverter(ROUTE_PAGE_TEMPLATE_CLONE, { pageTemplateCode: code }))
      )}
    >
      <FormattedMessage id="app.clone" />
    </MenuItem>
    <MenuItem
      className="PageTemplateListMenuActions__menu-item-details"
      onClick={() => (
        history.push(routeConverter(ROUTE_PAGE_TEMPLATE_DETAIL, { pageTemplateCode: code }))
      )}
    >
      <FormattedMessage id="app.details" />
    </MenuItem>
    {
      code !== NEXT_PAGE_TEMPLATE_CODE && (
        <MenuItem
          className="PageTemplateListMenuActions__menu-item-delete"
          onClick={onClickDelete}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      )
    }
  </DropdownKebab>
);

PageTemplateListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

PageTemplateListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default PageTemplateListMenuActions;
