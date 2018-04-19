import { connect } from 'react-redux';
import StepHypertextForm from 'ui/common/form/StepHypertextForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Hypertext',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataHypertextAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepHypertextForm);
export default StepDataHypertextAttributeContainer;
