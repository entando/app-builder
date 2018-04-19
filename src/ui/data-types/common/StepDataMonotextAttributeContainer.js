import { connect } from 'react-redux';
import StepMonotextForm from 'ui/common/form/StepMonotextForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Monotext',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataMonotextAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepMonotextForm);
export default StepDataMonotextAttributeContainer;
