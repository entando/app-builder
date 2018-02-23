import React from 'react';

import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'patternfly-react';


const popover = messageId => (
  <Popover id={messageId}>
    <p>
      {messageId}
    </p>
  </Popover>
);

const PageTitle = ({ title, helpMessage }) => (
  <div className="PageTitle">
    <div className="PageTitle__header">
      <h1>
        <span>{title}</span>
        <span className="pull-right">
          <OverlayTrigger
            overlay={popover(helpMessage)}
            placement="left"
            trigger={['click']}
            rootClose
          >
            <i className="PageTitle__icon fa pficon-help" />
          </OverlayTrigger>
        </span>
      </h1>
    </div>
  </div>
);

PageTitle.propTypes = {
  helpMessage: PropTypes.string,
  title: PropTypes.string,
};

PageTitle.defaultProps = {
  helpMessage: '',
  title: '',
};

export default PageTitle;
