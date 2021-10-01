import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const UploadTriggerButton = ({ onClick }) => (
  <Button bsStyle="primary" onClick={onClick}>
    <FormattedMessage id="cms.label.upload" defaultMessage="Upload" />
  </Button>
);

UploadTriggerButton.propTypes = {
  onClick: PropTypes.func,
};

UploadTriggerButton.defaultProps = {
  onClick: () => {},
};

export default UploadTriggerButton;
