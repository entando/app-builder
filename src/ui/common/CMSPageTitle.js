import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover } from 'patternfly-react';

const helpIcon = (helpId, position) => (helpId ? (
  <span className={position || null}>
    <OverlayTrigger
      overlay={(
        <Popover id={helpId}>
          <p>
            <FormattedMessage id={helpId} defaultMessage="You can see tips here." />
          </p>
        </Popover>
)}
      placement={position === 'pull-right' ? 'left' : 'right'}
      trigger={['click']}
      rootClose
    >
      <i className="CMSPageTitle__icon fa pficon-help" />
    </OverlayTrigger>
  </span>
) : null);

const CMSPageTitle = ({
  titleId, helpId, titleParam, position, noHeaderMargin, largeTitle,
}) => (
  <div className="CMSPageTitle">
    <div
      className="CMSPageTitle__header"
      style={noHeaderMargin ? { marginTop: 0, marginBottom: 0 } : {}}
    >
      <h1 className="CMSPageTitle__title" style={largeTitle ? { fontSize: '24px' } : {}}>
        <FormattedMessage id={titleId} defaultMessage="Title" values={titleParam} />
        {helpIcon(helpId, position)}
      </h1>
    </div>
  </div>
);

CMSPageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  helpId: PropTypes.string,
  titleParam: PropTypes.shape({}),
  position: PropTypes.string,
  noHeaderMargin: PropTypes.bool,
  largeTitle: PropTypes.bool,
};

CMSPageTitle.defaultProps = {
  helpId: '',
  titleParam: {},
  position: '',
  noHeaderMargin: false,
  largeTitle: false,
};

export default CMSPageTitle;
