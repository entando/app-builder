import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CONFIRM_KEYS } from 'ui/common/accessibility/KeyCodes';

const SectionCollapseTitle = ({
  name, nameId, onClick, isOpened,
}) => {
  const handleKeyDown = (e) => {
    if (CONFIRM_KEYS.includes(e.keyCode)) {
      onClick(e);
    }
  };
  return (
    <div
      className="SectionCollapse__title no-padding"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {<span>{name}</span> || (
        <FormattedMessage id={nameId} defaultMessage="Info" />
      )}
      <span className={`icon fa fa-chevron-${isOpened ? 'down' : 'right'} SectionCollapse__title-collapse-button`} />
    </div>
  );
};

SectionCollapseTitle.propTypes = {
  name: PropTypes.string,
  nameId: PropTypes.string,
  onClick: PropTypes.func,
  isOpened: PropTypes.bool,
};

SectionCollapseTitle.defaultProps = {
  name: '',
  nameId: '',
  onClick: () => {},
  isOpened: false,
};

export default SectionCollapseTitle;
