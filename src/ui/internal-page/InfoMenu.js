import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { ROUTE_DASHBOARD } from 'app-init/router';
import InfoDropdown from 'ui/internal-page/InfoDropdown';

const InfoMenu = () => (
  <InfoDropdown key="infoDropdown">
    <LinkMenuItem
      id="info-menu-about"
      to={ROUTE_DASHBOARD}
      label={<FormattedMessage id="app.about" />}
    />
    <LinkMenuItem
      id="info-menu-license"
      to={ROUTE_DASHBOARD}
      label={<FormattedMessage id="app.license" />}
    />
  </InfoDropdown>
);

export default InfoMenu;
