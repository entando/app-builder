import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CONFIRM_KEYS } from 'ui/common/accessibility/KeyCodes';

const CollapsibleSectionTitle = ({
  name, nameId, onClick, isOpened,
}) => {
  const handleKeyDown = (e) => {
    if (CONFIRM_KEYS.includes(e.keyCode)) {
      onClick(e);
    }
  };
  return (
    <div
      className="CollapsibleSection__title no-padding"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {<span>{name}</span> || (
        <FormattedMessage id={nameId} defaultMessage="Info" />
      )}
      <span className={`icon fa fa-chevron-${isOpened ? 'down' : 'right'} CollapsibleSection__title-collapse-button`} />
    </div>
  );
};

CollapsibleSectionTitle.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  nameId: PropTypes.string,
  onClick: PropTypes.func,
  isOpened: PropTypes.bool,
};

CollapsibleSectionTitle.defaultProps = {
  name: '',
  nameId: '',
  onClick: () => {},
  isOpened: false,
};

export default CollapsibleSectionTitle;
