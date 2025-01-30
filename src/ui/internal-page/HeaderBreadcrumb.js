import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import Icon from 'ui/common/icon/Icon';

const publicUrl = process.env.PUBLIC_URL;
const HeaderBreadcrumb = ({ breadcrumbs, ...props }) => {
  const [container, setContainer] = useState(document.getElementById('header-breadcrumbs'));

  useEffect(() => {
    if (!container) {
      const fallbackContainer = document.getElementById('header-breadcrumbs');
      setContainer(fallbackContainer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!container) return <div />;

  return createPortal(
    <Breadcrumb {...props} >
      <BreadcrumbItem>
        <Icon
          src={`${publicUrl}/icons/app-builder-icon.svg`}
          type="svg"
          alt="app builder"
          className="VerticalMenu__headerBreadcrumbs__icon"
        />
        <span>App Builder</span>
      </BreadcrumbItem>
      {breadcrumbs.map(({
 label, customLabel = '', children, ...rest
}) => (
  <BreadcrumbItem key={label} {...rest} >
    {label && <FormattedMessage id={label} />}
    {customLabel && { customLabel }}
    {children && children}
  </BreadcrumbItem>))}
    </Breadcrumb>,
    container,
  );
};

HeaderBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
    active: PropTypes.boolean,
    customLabel: PropTypes.string,
    children: PropTypes.node,
  })).isRequired,
};

export default HeaderBreadcrumb;
