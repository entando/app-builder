import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Icon } from 'patternfly-react';

const ContentPages = () => (
  <div className="ContentPages">
    <div className="ContentPages__content_title">
      <Button bsStyle="primary" bsSize="large">
        <Icon name="plus" />
        <FormattedMessage id="app.add" />
      </Button>
    </div>

  </div>

);

export default ContentPages;
