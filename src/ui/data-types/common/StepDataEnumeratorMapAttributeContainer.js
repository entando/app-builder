import { connect } from 'react-redux';
import StepEnumeratorMapForm from 'ui/common/form/StepEnumeratorMapForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'EnumeratorMap',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataEnumeratorMapAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepEnumeratorMapForm);
export default StepDataEnumeratorMapAttributeContainer;
