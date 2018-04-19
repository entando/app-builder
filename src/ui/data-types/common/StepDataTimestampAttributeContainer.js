import { connect } from 'react-redux';
import StepTimestampForm from 'ui/common/form/StepTimestampForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Timestamp',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataTimestampAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepTimestampForm);
export default StepDataTimestampAttributeContainer;
