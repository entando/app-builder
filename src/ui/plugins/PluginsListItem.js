import React from 'react';
import PropTypes from 'prop-types';
import { Col, CardBody, Card } from 'patternfly-react';

const PluginsListItem = ({ plugin }) => (
  <Col md={4} className="PluginListItem" key={plugin.id}>
    <Card>
      <div className="PluginListItem__icon">
        <span>
          <i className="fa pficon-plugged" />
        </span>
        <br />
      </div>
      <CardBody>
        <p className="PluginListItem__name">
          {plugin.name}
        </p>
      </CardBody>
    </Card>
  </Col>
);

PluginsListItem.propTypes = {
  plugin: PropTypes.shape({
    id: PropTypes.string,
  }),
};

PluginsListItem.defaultProps = {
  plugin: null,
};

export default PluginsListItem;
