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
// import AttributeCompositeForm from 'ui/common/form/AttributeCompositeForm';

import { TYPE_COMPOSITE, MODE_ADD_COMPOSITE, MODE_EDIT_COMPOSITE } from 'state/data-types/const';

export class AttributeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }


  render() {
    console.log('AttributeForm props', this.props);
    const {
      selectedAttributeType, dataTypeAttributeCode, mode,
      // compositeAttributes,
    } = this.props;
    const isComposite = mode === MODE_ADD_COMPOSITE;
    // const isAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;

    const renderAttributeInfo = () => (
      isComposite ?
        <AttributeInfoComposite /> :
        <AttributeInfo {...this.props} />
    );

    const renderAttributeRole = () => (
      !isComposite ? <AttributeRole {...this.props} /> : null
    );

    const renderSelectedAttribute = () => {
      switch (selectedAttributeType.code) {
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
        case TYPE_COMPOSITE: {
          if (isComposite) {
            return (<AttributeListTableComposite
              entityCode={dataTypeAttributeCode}
              {...this.props}
            />);
          }
          // else if (isAddAttributeComposite) {
          //   return (
          //     <FieldArray
          //       name="compositeAttributes"
          //       component={AttributeCompositeForm}
          //       selectedAttributeType={selectedAttributeType.code}
          //       compositeAttributes={compositeAttributes}
          //     />
          //   );
          // }
          return null;
        }


        default: return (
          <FormSection name="validationRules">
            <AttributeHypeLongMonoTextSettings {...this.props} />
          </FormSection>
        );
      }
    };

    const renderOgnlValidation = () => (
      !isComposite ?
        <FormSection name="validationRules">
          <AttributeOgnlValidation />
        </FormSection> : null
    );

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
              className="pull-right AttributeForm__continue--btn"
              type="submit"
              bsStyle="primary"
              disabled={this.props.invalid || this.props.submitting}
            >
              {
                mode !== MODE_EDIT_COMPOSITE ? <FormattedMessage id="app.continue" /> : <FormattedMessage id="app.save" />
              }
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
  mode: PropTypes.string.isRequired,
  compositeAttributes: PropTypes.arrayOf(PropTypes.shape({})),

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
  compositeAttributes: [],
};

const AttributeForm = reduxForm({
  form: 'addAttribute',
})(AttributeFormBody);

export default AttributeForm;

// {
//   (isAddAttributeComposite && selectedAttributeType.code !== TYPE_COMPOSITE) ?
//     <AttributeCompositeForm
//       mode="no filedArray"
//       selectedAttributeType={selectedAttributeType.code}
//       compositeAttributes={compositeAttributes}
//     /> :
//   renderAttributes()
// }
