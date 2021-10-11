import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownKebab,
  MenuItem,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const ImagesListItemActions = ({
  imageId, onClickRemove, onClickRecover, imageDescription,
}) => {
  const handleClickRecover = () => {
    onClickRecover({ id: imageId, name: imageDescription });
  };

  const handleClickRemove = () => {
    onClickRemove({ id: imageId, name: imageDescription });
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

ImagesListItemActions.propTypes = {
  imageId: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
};

ImagesListItemActions.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};


export default ImagesListItemActions;
