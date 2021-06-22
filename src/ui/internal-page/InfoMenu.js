import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { useDispatch } from 'react-redux';

import InfoDropdown from 'ui/internal-page/InfoDropdown';
import { setVisibleModal } from 'state/modal/actions';
import { MODAL_ID as ABOUT_MODAL_ID } from 'ui/about/AboutInfoModal';
import { MODAL_ID as LICENSE_MODAL_ID } from 'ui/license/LicenseInfoModal';

const InfoMenu = ({ onStartTutorial }) => {
  const dispatch = useDispatch();

  const handleAboutClick = useCallback(
    () => dispatch(setVisibleModal(ABOUT_MODAL_ID)),
    [dispatch],
  );

  const handleLicenseClick = useCallback(
    () => dispatch(setVisibleModal(LICENSE_MODAL_ID)),
    [dispatch],
  );

  return (
    <InfoDropdown key="infoDropdown">
      <li
        id="info-menu-about"
        className="LinkMenuItem"
      >
        <a
          onClick={handleAboutClick}
          onKeyPress={handleAboutClick}
          role="button"
          tabIndex={-1}
        >
          <FormattedMessage id="app.about" />
        </a>
      </li>
      <li
        id="info-menu-license"
        className="LinkMenuItem"
      >
        <a
          onClick={handleLicenseClick}
          onKeyPress={handleLicenseClick}
          role="button"
          tabIndex={-1}
        >
          <FormattedMessage id="app.license" />
        </a>
      </li>
      <LinkMenuItem
        id="info-menu-start-tutorial"
        to="#"
        onClick={onStartTutorial}
        label={<FormattedMessage id="app.startTutorial" />}
      />
    </InfoDropdown>
  );
};

InfoMenu.propTypes = {
  onStartTutorial: PropTypes.func.isRequired,
};

export default InfoMenu;
