import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  EmptyState, EmptyStateAction, Button,
  EmptyStateInfo,
} from 'patternfly-react';
import { Link } from 'react-router-dom';
import { ROUTE_DE_COMPONENT_LIST } from 'app-init/router';

const PluginListEmptyState = () => (
  <EmptyState className="PluginListPageEmptyState">
    <EmptyStateInfo >
      <FormattedMessage id="plugins.noPlugins" />
    </EmptyStateInfo>
    <EmptyStateAction>
      <Link to={ROUTE_DE_COMPONENT_LIST}>
        <Button bsStyle="primary" bsSize="large">
          <FormattedMessage id="plugins.installCallToAction" />
        </Button>
      </Link>
    </EmptyStateAction>
  </EmptyState>
);

export default PluginListEmptyState;
