import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import PropTypes from 'prop-types';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const AttributeInfoComposite = ({ prefixName }) => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.info" />
          <div className="DataTypeForm__required-fields text-right">
            * <FormattedMessage id="app.fieldsRequired" />
          </div>
        </legend>
        <Field
          component={RenderTextInput}
          name={`${prefixName}compositeAttributeType`}
          label={
            <FormLabel labelId="app.type" />
            }
          disabled
        />
      </fieldset>
    </Col>
  </Row>
);

AttributeInfoComposite.propTypes = {
  prefixName: PropTypes.string,
};

AttributeInfoComposite.defaultProps = {
  prefixName: '',
};


export default AttributeInfoComposite;
