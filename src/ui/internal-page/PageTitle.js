import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { Link } from '@entando/router';


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
      <Link route={link}>
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
}) => (
  <div className="PageTitle">
    <div className="PageTitle__header">
      <h1 className="PageTitle__title">
        <FormattedMessage id={titleId} values={titleParam} />
        {configIcon(configLink)}
        {helpIcon(helpId)}
      </h1>
    </div>
  </div>
);

PageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  helpId: PropTypes.string,
  configLink: PropTypes.string,
  titleParam: PropTypes.shape({}),
};

PageTitle.defaultProps = {
  helpId: '',
  configLink: '',
  titleParam: {},
};

export default PageTitle;
