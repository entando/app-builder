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

const ReloadAction = ({ onReload }) => (
  <EmptyState>
    <EmptyStateIcon name="exclamation" type="fa" className="ReloadAction__icon" />
    <EmptyStateTitle>
      <FormattedMessage id="reloadConfiguration.reload.title" />
    </EmptyStateTitle>
    <EmptyStateInfo>
      <FormattedMessage id="reloadConfiguration.reload.confirm" />
    </EmptyStateInfo>
    <EmptyStateAction>
      <Button bsStyle="danger" bsSize="large" onClick={() => (onReload())}>
        <FormattedMessage id="app.reload" />
      </Button>
    </EmptyStateAction>
  </EmptyState>
);

ReloadAction.propTypes = {
  onReload: PropTypes.func.isRequired,
};

export default ReloadAction;
