import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, CardBody, DropdownKebab, Card, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { ROUTE_PLUGIN_CONFIG_PAGE } from 'app-init/router';
import { routeConverter } from '@entando/utils';


const PluginsListItem = ({ plugin }) => (

  <Col md={4} key={`marketplace-${plugin.id}`}>
    <Card>
      <DropdownKebab className="pull-right" pullRight id={`${plugin.id}-actions`}>
        <LinkMenuItem
          id={`edit-${plugin.id}`}
          to={routeConverter(ROUTE_PLUGIN_CONFIG_PAGE, { id: plugin.id })}
          label={<FormattedMessage id="pages.pageForm.settings" />}
        />
        <MenuItem
          onClick={() => {}}
        >
          <FormattedMessage id="digitalExchange.components.uninstall" />
        </MenuItem>
      </DropdownKebab>
      <div className="ServerIcon">
        <span>
          <i className="fa pficon-plugged" />
        </span>
        <br />
      </div>
      <CardBody>
        <p className="ServerName">
          {plugin.name}
        </p>
      </CardBody>
    </Card>
  </Col>
);

PluginsListItem.propTypes = {
  plugin: PropTypes.shape({}),
};

PluginsListItem.defaultProps = {
  plugin: null,
};

export default PluginsListItem;
