import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeInfoComposite from 'ui/common/attributes/AttributeInfoComposite';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';
import AttributeListTableComposite from 'ui/common/attributes/AttributeListTableComposite';

import { MODE_ADD_COMPOSITE, MODE_EDIT_COMPOSITE } from 'state/data-types/const';

export class EditAttributeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { selectedAttributeType, mode } = this.props;
    const isComposite = mode === MODE_EDIT_COMPOSITE || mode === MODE_ADD_COMPOSITE;

    const renderSelectedAttribute = () => {
      switch (selectedAttributeType) {
        case 'Boolean': return null;
        case 'CheckBox': return null;
        case 'Monolist': return <AttributeMonoListMonoSettings {...this.props} />;
        case 'List': return <AttributeMonoListMonoSettings {...this.props} />;
        case 'Number': return (
          <FormSection name="validationRules">
            <AttributesNumber {...this.props} />
          </FormSection>
        );
        case 'Date': return (
          <FormSection name="validationRules">
            <AttributesDateSettings {...this.props} />
          </FormSection>
        );
        case 'Enumerator': return (
          <AttributeEnumSettings {...this.props} />
        );
        case 'EnumeratorMap': return (
          <AttributeEnumMapSettings {...this.props} />
        );
        case 'Composite':
          return isComposite ? <AttributeListTableComposite {...this.props} /> : null;

        default: return (
          <FormSection name="validationRules">
            <AttributeHypeLongMonoTextSettings {...this.props} />
          </FormSection>
        );
      }
    };

    const renderAttributeInfo = () => (
      isComposite ?
        <AttributeInfoComposite /> :
        <AttributeInfo {...this.props} mode={mode} />
    );

    const renderAttributeRole = () => (
      !isComposite ? <AttributeRole {...this.props} /> : null
    );

    const renderOgnlValidation = () => (
      !isComposite ?
        <FormSection name="validationRules">
          <AttributeOgnlValidation />
        </FormSection> : null
    );

    return (
      <form
        onSubmit={this.props.handleSubmit(values => (
           this.props.onSubmit(values, this.props.allowedRoles, mode)
         ))}
        className="form-horizontal"
      >
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
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right EditAttributeForm__continue--btn"
              type="submit"
              bsStyle="primary"
              disabled={this.props.invalid || this.props.submitting}
            >
              {
              !isComposite ? <FormattedMessage id="app.continue" /> : <FormattedMessage id="app.save" />
              }
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

EditAttributeFormBody.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedAttributeType: PropTypes.string,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  mode: PropTypes.string.isRequired,
};

EditAttributeFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  selectedAttributeType: '',
  allowedRoles: [],
};

const EditAttributeForm = reduxForm({
  form: 'attribute',
})(EditAttributeFormBody);

export default EditAttributeForm;
