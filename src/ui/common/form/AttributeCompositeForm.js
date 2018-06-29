import React from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';
import { Row, Col } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';

const AttributeCompositeForm = (props) => {
  const { selectedAttributeType } = props;

  const renderAttributeInfo = () => (
    <AttributeInfo />
  );

  const renderAttributeRole = () => (
    <AttributeRole {...props} />);

  const renderSelectedAttribute = () => {
    switch (selectedAttributeType) {
      case 'Boolean': return null;
      case 'CheckBox': return null;
      case 'Monolist': return <AttributeMonoListMonoSettings {...props} />;
      case 'List': return <AttributeMonoListMonoSettings {...props} />;
      case 'Number': return (
        <FormSection name="validationRules">
          <AttributesNumber {...props} />
        </FormSection>
      );
      case 'Date': return (
        <FormSection name="validationRules">
          <AttributesDateSettings {...props} />
        </FormSection>
      );
      case 'Enumerator': return (
        <AttributeEnumSettings {...props} />
      );
      case 'EnumeratorMap': return (
        <AttributeEnumMapSettings {...props} />
      );
      default: return (
        <FormSection name="validationRules">
          <AttributeHypeLongMonoTextSettings {...props} />
        </FormSection>
      );
    }
  };

  const renderOgnlValidation = () => (
    <FormSection name="validationRules">
      <AttributeOgnlValidation />
    </FormSection>
  );

  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          {renderAttributeInfo()}
          {renderAttributeRole()}
          {renderSelectedAttribute()}
          {renderOgnlValidation()}
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeCompositeForm.propTypes = {
  selectedAttributeType: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({})),
};

AttributeCompositeForm.defaultProps = {
  fields: [],
};

export default AttributeCompositeForm;
