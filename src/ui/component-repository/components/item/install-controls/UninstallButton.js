import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import { componentType } from 'models/component-repository/components';

const UninstallButton = ({ component, onClickUninstall }) => (
  <Fragment>
    <span className="ComponentList__status">
      <FormattedMessage id="componentRepository.components.installed" />
    </span>
    <Button
      bsStyle="link"
      className="ComponentList__uninstall"
      onClick={() => onClickUninstall(component.id)}
    >
      <FormattedMessage id="componentRepository.components.uninstall" />
    </Button>
  </Fragment>
);

UninstallButton.propTypes = {
  component: componentType.isRequired,
  onClickUninstall: PropTypes.func.isRequired,
};

export default UninstallButton;
