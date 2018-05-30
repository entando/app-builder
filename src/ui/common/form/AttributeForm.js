import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';


export class AttributeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { selectedAttributeType } = this.props;
    const renderMonolistConf = () => {
      if (selectedAttributeType.listAttribute) {
        return (
          <AttributeMonoListMonoSettings {...this.props} />
        );
      }
      return '';
    };

    const renderNumberConf = () => {
      if (selectedAttributeType.numberFilterSupported) {
        return (
          <FormSection name="validationRules">
            <AttributesNumber {...this.props} />
          </FormSection>
        );
      }
      return '';
    };

    const renderDateConf = () => {
      if (selectedAttributeType.dateFilterSupported) {
        return (
          <FormSection name="validationRules">
            <AttributesDateSettings {...this.props} />
          </FormSection>
        );
      }
      return '';
    };

    const renderTextConf = () => {
      if (selectedAttributeType.multilingual) {
        return (
          <FormSection name="validationRules">
            <AttributeHypeLongMonoTextSettings {...this.props} />
          </FormSection>
        );
      }
      return '';
    };

    const renderEnumConf = () => {
      if (selectedAttributeType.enumeratorOptionsSupported) {
        return (
          <AttributeEnumSettings {...this.props} />
        );
      }
      return '';
    };

    const renderEnumMapConf = () => {
      if (selectedAttributeType.enumeratorMapOptionsSupported) {
        return (
          <AttributeEnumMapSettings {...this.props} />
        );
      }
      return '';
    };

    return (
      <form
        onSubmit={this.props.handleSubmit(values => (
            this.props.onSubmit(values, this.props.allowedRoles)
          ))}
        className="form-horizontal"
      >
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <AttributeInfo {...this.props} />
              <AttributeRole {...this.props} />
              {renderMonolistConf()}
              {renderTextConf()}
              {renderEnumConf()}
              {renderEnumMapConf()}
              <FormSection name="validationRules">
                {renderNumberConf()}
                {renderDateConf()}
                <AttributeOgnlValidation />
              </FormSection>
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right AttributeForm__continue--btn"
              type="submit"
              bsStyle="primary"
              disabled={this.props.invalid || this.props.submitting}
            >
              <FormattedMessage id="app.continue" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}


AttributeFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  profileTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  initialValues: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }),
  selectedAttributeType: PropTypes.shape({
    simple: PropTypes.bool,
    searchableOptionSupported: PropTypes.bool,
    indexableOptionSupported: PropTypes.bool,
    textFilterSupported: PropTypes.bool,
    dateFilterSupported: PropTypes.bool,
    numberFilterSupported: PropTypes.bool,
    enumeratorOptionsSupported: PropTypes.bool,
    enumeratorMapOptionsSupported: PropTypes.bool,
    listAttribute: PropTypes.bool,
    enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
    enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  validation: PropTypes.shape({
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    regex: PropTypes.string,
  }),
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
};

AttributeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  profileTypeAttributeCode: '',
  initialValues: {},
  selectedAttributeType: {
    enumeratorExtractorBean: [],
    enumeratorMapExtractorBeans: [],
  },
  validation: ({
    minLength: '',
    maxLength: '',
    regex: '',
  }),
  allowedRoles: [],
};

const AttributeForm = reduxForm({
  form: 'attribute',
})(AttributeFormBody);

export default AttributeForm;
