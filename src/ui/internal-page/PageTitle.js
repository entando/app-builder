import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { Link } from 'react-router-dom';


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
        <i className="PageTitle__icon fa pficon-help" />
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
  dataCy,
}) => console.log('dataCy', dataCy) || (
  <div className="PageTitle">
    <div className="PageTitle__header">
      <h1 className="PageTitle__title" data-cy={dataCy}>
        <FormattedMessage id={titleId} values={titleParam} />
        {!hideConfigLink && configIcon(configLink)}
        {helpIcon(helpId)}
      </h1>
    </div>
  </div>
);

PageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  helpId: PropTypes.string,
  configLink: PropTypes.string,
  hideConfigLink: PropTypes.bool,
  titleParam: PropTypes.shape({}),
  dataCy: PropTypes.string,
};

PageTitle.defaultProps = {
  helpId: '',
  configLink: '',
  hideConfigLink: false,
  titleParam: {},
  dataCy: '',
};

export default PageTitle;
