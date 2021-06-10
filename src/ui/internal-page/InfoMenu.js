import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { useDispatch } from 'react-redux';

import { ROUTE_LICENSE } from 'app-init/router';
import InfoDropdown from 'ui/internal-page/InfoDropdown';
import { setVisibleModal } from 'state/modal/actions';
import { MODAL_ID as ABOUT_MODAL_ID } from 'ui/about/AboutInfoModal';

const InfoMenu = ({ onStartTutorial }) => {
  const dispatch = useDispatch();

  const handleAboutClick = useCallback(
    () => dispatch(setVisibleModal(ABOUT_MODAL_ID)),
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
      <LinkMenuItem
        id="info-menu-license"
        to={ROUTE_LICENSE}
        label={<FormattedMessage id="app.license" />}
      />
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
