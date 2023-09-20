import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { useDispatch, useSelector } from 'react-redux';

import InfoDropdown from 'ui/internal-page/InfoDropdown';
import { setVisibleModal } from 'state/modal/actions';
import { MODAL_ID as ABOUT_MODAL_ID } from 'ui/about/AboutInfoModal';
import { MODAL_ID as LICENSE_MODAL_ID } from 'ui/license/LicenseInfoModal';
import { withPermissionValues } from 'ui/auth/withPermissions';
import { getWizardCanBeShown } from 'state/app-tour/selectors';

const InfoMenu = ({ onStartTutorial, isSuperuser }) => {
  const dispatch = useDispatch();
  const wizardCanBeShown = useSelector(getWizardCanBeShown);

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
      {
        isSuperuser && wizardCanBeShown ? (
          <LinkMenuItem
            id="info-menu-start-tutorial"
            to="#"
            onClick={onStartTutorial}
            label={<FormattedMessage id="app.startTutorial" />}
          />
        ) : null
      }
    </InfoDropdown>
  );
};

InfoMenu.propTypes = {
  onStartTutorial: PropTypes.func.isRequired,
  isSuperuser: PropTypes.bool.isRequired,
};

export default withPermissionValues(InfoMenu);
