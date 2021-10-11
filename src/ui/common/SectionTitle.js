import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CONFIRM_KEYS } from 'ui/common/accessibility/KeyCodes';

const SectionTitle = ({
  nameId, label, onClick, collapsable, isOpened, noRequired, children, className, collapseButtonEnd,
}) => {
  const renderCollapseBtn = () => (
    <span className={`icon fa fa-chevron-${isOpened ? 'down' : 'right'} SectionTitle__collapse-button`} />
  );
  const handleKeyDown = (e) => {
    if (CONFIRM_KEYS.includes(e.keyCode)) {
      onClick(e);
    }
  };
  const classNames = ['SectionTitle'];
  if (className) {
    classNames.push(className);
  }
  if (!collapsable) {
    classNames.push('SectionTitle__non-collapsable');
  }
  if (collapseButtonEnd) {
    classNames.push('SectionTitle__collapse-icon-end');
  }
  return (
    <div
      className={classNames.join(' ')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {
        collapsable && !collapseButtonEnd
        && renderCollapseBtn()
      }
      {label || (
        <FormattedMessage id={nameId} defaultMessage="Info" />
      )}
      {
        collapsable && collapseButtonEnd
        && renderCollapseBtn()
      }
      {!noRequired && (
        <span className="SectionTitle__tip">
          <FormattedMessage id="cms.contents.edit.tip" defaultMessage="* Required Fields" />
        </span>
      )}
      {children && (
        <span className="pull-right">
          {children}
        </span>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  nameId: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onClick: PropTypes.func,
  collapsable: PropTypes.bool,
  isOpened: PropTypes.bool,
  noRequired: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  collapseButtonEnd: PropTypes.bool,
};

SectionTitle.defaultProps = {
  onClick: () => {},
  nameId: '',
  label: null,
  collapsable: false,
  isOpened: false,
  noRequired: false,
  children: null,
  className: '',
  collapseButtonEnd: false,
};

export default SectionTitle;
