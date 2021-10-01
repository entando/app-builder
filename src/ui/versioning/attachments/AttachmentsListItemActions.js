import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownKebab,
  MenuItem,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const AttachmentsListItemActions = ({
  attachmentId, onClickRemove, onClickRecover, attachmentDescription,
}) => {
  const handleClickRecover = () => {
    onClickRecover({ id: attachmentId, name: attachmentDescription });
  };

  const handleClickRemove = () => {
    onClickRemove({ id: attachmentId, name: attachmentDescription });
  };

  return (
    <DropdownKebab id="action2kebab" pullRight toggleStyle="link">
      <MenuItem onClick={handleClickRecover}>
        <FormattedMessage id="cms.label.recover" defaultMessage="Recover" />
      </MenuItem>
      <MenuItem divider />
      <MenuItem onClick={handleClickRemove}>
        <FormattedMessage id="cms.label.remove" defaultMessage="Remove" />
      </MenuItem>
    </DropdownKebab>
  );
};

AttachmentsListItemActions.propTypes = {
  attachmentId: PropTypes.string.isRequired,
  attachmentDescription: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
};

AttachmentsListItemActions.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};


export default AttachmentsListItemActions;
