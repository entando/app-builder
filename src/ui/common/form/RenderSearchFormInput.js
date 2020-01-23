import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Button, Icon } from 'patternfly-react';

const msgs = defineMessages({
  search: {
    id: 'app.search',
    defaultMessage: 'Search',
  },
});

const RenderSearchFormInput = ({
  input,
  intl,
  meta,
  onClear,
  ...others
}) => (
  <div className="SearchForm__textbox">
    <input
      {...input}
      id={input.name}
      type="text"
      className="SearchForm__textbox--base"
      placeholder={intl.formatMessage(msgs.search)}
      {...others}
    />
    {input.value ? (
      <Button
        className="btn-transparent SearchForm__button-close"
        onClick={onClear}
      >
        <Icon name="close" />
      </Button>
    ) : null}
  </div>
);

RenderSearchFormInput.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  onClear: PropTypes.func,
  intl: intlShape.isRequired,
};

RenderSearchFormInput.defaultProps = {
  input: {},
  meta: {},
  onClear: () => {},
};

export default injectIntl(RenderSearchFormInput);
