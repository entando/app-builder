import { connect } from 'react-redux';
import StepBooleanForm from 'ui/common/form/StepBooleanForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getFormValues } from 'redux-form';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log('Boolean step code', getDataTypeSelectedAttributeCode(state));
  console.log('Boolean step name', getFormValues('MonoListAttribute')(state));
  return {
    attributeCode: getDataTypeSelectedAttributeCode(state),
    dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
    attributeName: getDataTypeSelectedAttributeCode(state),
    attributeParent: 'test parent',
    initialValues: {
      attributeTypeCode: 'Boolean',
    },
    formValues: getFormValues('MonoListAttribute')(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataBooleanAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepBooleanForm);
export default StepDataBooleanAttributeContainer;
