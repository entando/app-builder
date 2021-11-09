import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Badge } from 'patternfly-react';

const InstalledVersion = ({ version, installed }) => (version ? (
  <div className="ComponentList__version-container">
    {installed ? <FormattedMessage id="componentRepository.components.installedVersion" /> :
    <FormattedMessage id="componentRepository.components.latestVersion" />}{':'}&nbsp;
    <span className="ComponentList__version">
      <Badge>{version}</Badge>
    </span>
  </div>
) : null);

InstalledVersion.propTypes = {
  version: PropTypes.string,
  installed: PropTypes.bool,
};

InstalledVersion.defaultProps = {
  version: '',
  installed: false,
};

export default InstalledVersion;
