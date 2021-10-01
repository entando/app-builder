import React from 'react';
import PropTypes from 'prop-types';
import { BrandMenu, FirstLevelMenuItem, LinkMenuItem } from '@entando/menu';
import { FormattedMessage } from 'react-intl';

import LinkMenu from 'ui/common/LinkMenu';

const BRAND_LOGO = <img src="/images/entando-logo.svg" alt="" />;

const CMSShell = ({ className, children }) => (
  <div className={['CMSShell', className].join(' ').trim()}>
    <BrandMenu brandLogo={BRAND_LOGO} title="Runtime Authoring Tool">
      <LinkMenuItem
        id="menu-dashboard"
        label={<FormattedMessage id="cms.menu.dashboard" defaultMessage="Dashboard" />}
        to="/"
      />
      <FirstLevelMenuItem
        id="menu-cms"
        label={<FormattedMessage id="cms.menu.cms" defaultMessage="CMS" />}
      >
        <LinkMenu />
      </FirstLevelMenuItem>
    </BrandMenu>
    {children}
  </div>
);

CMSShell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CMSShell.defaultProps = {
  children: null,
  className: '',
};

export default CMSShell;
