import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Button, OverlayTrigger, Popover } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyTextButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const resetCopyIcon = debounce(() => setCopied(false), 3000);

  const handleCopy = () => {
    setCopied(true);
    resetCopyIcon.cancel();
    resetCopyIcon();
  };
  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <OverlayTrigger
        overlay={(
          <Popover id="copytextoverlay">
            <FormattedMessage id="cms.contents.edit.copytext" />
          </Popover>
        )}
        placement="top"
        trigger={['hover']}
        rootClose
      >
        <Button>
          <span className={`fa fa-default ${copied ? 'fa-check' : 'fa-copy'}`} />
        </Button>
      </OverlayTrigger>
    </CopyToClipboard>
  );
};

CopyTextButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyTextButton;
