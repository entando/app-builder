/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { Button, Modal } from 'patternfly-react';
import ICONS from 'test/mocks/fontAwesomeIcons';

export const MODAL_ID = 'IconLibrary';

const IconLibrary = ({ intl, selected, onSelect }) => {
  const [selectedIcon, setSelectedIcon] = useState(selected);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setSelectedIcon(selected);
  }, [selected]);

  const handleCloseModal = () => {
    setSelectedIcon(selected);
  };

  const handleSelect = () => {
    onSelect(selectedIcon);
  };

  const buttons = [
    <Button bsStyle="primary" onClick={handleSelect}>
      <FormattedMessage id="app.select" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="widget.icon.iconLibrary" /></Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="IconLibrary"
      modalCloseCleanup={handleCloseModal}
    >
      <div>
        <input
          className="form-control"
          placeholder={intl.formatMessage({ id: 'app.search' })}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="IconLibrary__icon-list">
        <ul className="IconLibrary__ul">
          {ICONS.filter(icon => icon.includes(filter)).map(icon =>
            (
              <li
                key={icon}
                className={cx('IconLibrary__li', selectedIcon === icon && 'IconLibrary__selected')}
                onClick={() => setSelectedIcon(icon)}
              >
                <span className={cx('fa', icon)} /> {icon}
              </li>))}
        </ul>
      </div>
    </GenericModalContainer>);
};

IconLibrary.propTypes = {
  intl: intlShape.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

IconLibrary.defaultProps = {
  selected: '',
};

export default injectIntl(IconLibrary);
