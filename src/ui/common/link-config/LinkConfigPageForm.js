import React from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm,
  Field,
  FormSection,
  fieldInputPropTypes,
} from 'redux-form';
import { Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import PageTreeContainer from 'ui/common/page/PageTreeSelectContainer';
import FormLabel from 'ui/common/form/FormLabel';
import LinkConfigAttributes from 'ui/common/link-config/LinkConfigAttributes';

const PageTreeField = ({
  input, mainGroup, joinGroups, pageCode,
}) => (
  <PageTreeContainer
    ownerGroup={mainGroup}
    input={{ value: pageCode, onChange: input.onChange }}
    joinGroups={joinGroups}
    status="published"
  />
);

PageTreeField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageCode: PropTypes.string.isRequired,
};

const label = <FormLabel labelId="cms.linkconfig.pageSelect" />;

const LinkConfigPageForm = ({
  onCancel, handleSubmit, mainGroup, joinGroups, page, attributes,
}) => (
  <form className="form-horizontal" onSubmit={handleSubmit}>
    <Col xs={2} className="text-right">
      <label>{label}</label>
    </Col>
    <Col xs={10}>
      <Field
        component={PageTreeField}
        mainGroup={mainGroup}
        joinGroups={joinGroups}
        pageCode={page}
        name="page"
      />
    </Col>
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
      <Button bsStyle="primary" onClick={() => handleSubmit({ page, attributes })}>
        <FormattedMessage id="cms.label.save" />
      </Button>
    </div>
  </form>
);

LinkConfigPageForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  page: PropTypes.string,
  attributes: PropTypes.shape({}),
};

LinkConfigPageForm.defaultProps = {
  page: '',
  attributes: {},
};

export default reduxForm({
  form: 'LinkConfigPage',
})(LinkConfigPageForm);
