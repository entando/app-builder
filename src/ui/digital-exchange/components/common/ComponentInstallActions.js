import React from 'react';
import { formattedText } from '@entando/utils';
import { Button } from 'patternfly-react';

import { componentType } from 'state/digital-exchange/components/propTypes';


const ComponentInstallActions = ({ component }) => {
  if (component.installed) {
    return (
      <div className="ComponentListGridView__install-actions">
        <span className="ComponentListGridView__status">
          {formattedText('digitalExchange.components.installed')}
        </span>
        <Button bsStyle="link" className="ComponentListGridView__uninstall">
          {formattedText('digitalExchange.components.uninstall')}
        </Button>
      </div>
    );
  }
  return (
    <div className="ComponentListGridView__install-actions">
      <Button bsStyle="primary" className="ComponentListGridView__install">
        {formattedText('digitalExchange.components.install')}
      </Button>
    </div>
  );
};

ComponentInstallActions.propTypes = {
  component: componentType.isRequired,
};


export default ComponentInstallActions;
