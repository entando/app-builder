import { connect } from 'react-redux';
import StepLongtextForm from 'ui/common/form/StepLongtextForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Longtext',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataLongtextAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepLongtextForm);
export default StepDataLongtextAttributeContainer;
