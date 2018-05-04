import React from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateInfo,
  EmptyStateAction,
  Button,
} from 'patternfly-react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ReloadConfig = ({ onReload }) => (
  <EmptyState className="ReloadConfig">
    <EmptyStateIcon name="exclamation" type="fa" className="ReloadConfig__icon" />
    <EmptyStateTitle className="ReloadConfig__title">
      <FormattedMessage id="reloadConfiguration.reload.title" />
    </EmptyStateTitle>
    <EmptyStateInfo className="ReloadConfig__info">
      <FormattedMessage id="reloadConfiguration.reload.confirm" />
    </EmptyStateInfo>
    <EmptyStateAction>
      <Button className="ReloadConfig__reload-button" bsStyle="danger" onClick={() => (onReload())}>
        <FormattedMessage id="app.reload" />
      </Button>
    </EmptyStateAction>
  </EmptyState>
);

ReloadConfig.propTypes = {
  onReload: PropTypes.func.isRequired,
};

export default ReloadConfig;
