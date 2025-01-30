import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { colorContent05 } from 'variables.scss';
import Icon from 'ui/common/icon/Icon';

const helpIcon = helpId => (
  helpId ?
    <span className="pull-right">
      <OverlayTrigger
        overlay={
          <Popover id={helpId}>
            <p>
              <FormattedMessage id={helpId} />
            </p>
          </Popover>
        }
        placement="left"
        trigger={['click']}
        rootClose
      >
        <Icon name="info" type="lucide" className="PageTitle__icon" color={colorContent05} />
      </OverlayTrigger>
    </span> :
    null
);

const configIcon = link => (
  link ?
    <span className="PageTitle__configuration pull-right">
      <Link to={link}>
        <i className="PageTitle__icon fa fa-cog" />
      </Link>
    </span> :
    null
);

const PageTitle = ({
  titleId,
  helpId,
  titleParam,
  configLink,
  hideConfigLink,
  'data-testid': dataTestId,
  children,
  className,
}) => (
  <div className={cx('PageTitle', className)}>
    <div className="PageTitle__header">
      <h1 className="PageTitle__title" data-testid={dataTestId}>
        <div className="PageTitle__content">
          <FormattedMessage id={titleId} values={titleParam} />
          {!hideConfigLink && configIcon(configLink)}
          {children}
        </div>
        {helpIcon(helpId)}
      </h1>
    </div>
  </div >
);

PageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  helpId: PropTypes.string,
  configLink: PropTypes.string,
  hideConfigLink: PropTypes.bool,
  titleParam: PropTypes.shape({}),
  'data-testid': PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

PageTitle.defaultProps = {
  helpId: '',
  configLink: '',
  hideConfigLink: false,
  titleParam: {},
  'data-testid': '',
  children: null,
  className: '',
};

export default PageTitle;
