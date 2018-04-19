import { connect } from 'react-redux';
import StepTextForm from 'ui/common/form/StepTextForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Text',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataTextAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepTextForm);
export default StepDataTextAttributeContainer;
