import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FormSection, fieldInputPropTypes } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import LinkConfigAttributes from 'ui/common/link-config/LinkConfigAttributes';
import ContentsContainer from 'ui/common/content/ContentsContainer';

const ContentsField = ({ input, mainGroup, joinGroups }) => (
  <ContentsContainer
    status="published"
    author="all"
    selectedContent={input.value}
    onContentSelect={input.onChange}
    ownerGroup={mainGroup}
    joinGroups={joinGroups}
  />
);

ContentsField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const LinkConfigContentForm = ({
  onCancel, handleClick, content, mainGroup, joinGroups, attributes,
}) => (
  <div className="form-horizontal">
    <Field
      component={ContentsField}
      mainGroup={mainGroup}
      joinGroups={joinGroups}
      name="content"
    />
    <FormSection name="attributes">
      <LinkConfigAttributes />
    </FormSection>
    <div className="text-right">
      <Button
        bsStyle="default"
        style={{ marginRight: '10px' }}
        onClick={onCancel}
      >
        <FormattedMessage id="cms.label.cancel" />
      </Button>
      <Button bsStyle="primary" onClick={() => handleClick({ content, attributes })}>
        <FormattedMessage id="cms.label.save" />
      </Button>
    </div>
  </div>
);

LinkConfigContentForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  content: PropTypes.string,
  mainGroup: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  attributes: PropTypes.shape({}),
};

LinkConfigContentForm.defaultProps = {
  content: '',
  attributes: {},
};

export default reduxForm({
  form: 'LinkConfigContent',
})(LinkConfigContentForm);
