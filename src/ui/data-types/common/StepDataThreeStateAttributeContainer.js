import { connect } from 'react-redux';
import StepThreeStateForm from 'ui/common/form/StepThreeStateForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'ThreeState',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataThreeStateAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepThreeStateForm);
export default StepDataThreeStateAttributeContainer;
