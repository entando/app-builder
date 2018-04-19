import { connect } from 'react-redux';
import StepEnumeratorForm from 'ui/common/form/StepEnumeratorForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Enumerator',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataEnumeratorAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepEnumeratorForm);
export default StepDataEnumeratorAttributeContainer;
