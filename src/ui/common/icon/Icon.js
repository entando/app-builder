/* eslint-disable react/prop-types, no-case-declarations */
import React from 'react';
import cx from 'classnames';
import { Icon as PFIcon } from 'patternfly-react';
import IconMap from 'ui/common/icon/IconMap';

const publicUrl = process.env.PUBLIC_URL;

const Icon = ({
  background, type = 'patternfly-icon', ...props
}) => {
  switch (type) {
    case ('svg'):
      return <img src={`${publicUrl}${props.src}`} alt={props.alt} {...props} />;
    case ('lucide'):
      const LucideIcon = IconMap[props.name];
      return (
        <div className={cx('Icon', background && 'icon__colored-bg')}>
          <LucideIcon
            {...props}
            size={props.size || 16}
            strokeWidth={props.strokeWidth || 2.5}
          />
        </div>
      );
    default:
      return (<PFIcon {...props} className={cx('Icon', background && 'icon__colored-bg')} />);
  }
};

export default Icon;
