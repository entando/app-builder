import React from 'react';
import { formattedText } from '@entando/utils';
import { Button } from 'patternfly-react';

// eslint-disable-next-line import/prefer-default-export
export const renderInstallActions = (component) => {
  if (component.installed) {
    return (
      <div className="ComponentListGridView__install-actions">
        <span className="ComponentListGridView__status">
          {formattedText('digital-exchange.components.installed')}
        </span>
        <Button bsStyle="link" className="ComponentListGridView__uninstall">
          {formattedText('digital-exchange.components.uninstall')}
        </Button>
      </div>
    );
  }
  return (
    <div className="ComponentListGridView__install-actions">
      <Button bsStyle="primary" className="ComponentListGridView__install">
        {formattedText('digital-exchange.components.install')}
      </Button>
    </div>
  );
};
