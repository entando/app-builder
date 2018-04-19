import { connect } from 'react-redux';
import StepCheckboxForm from 'ui/common/form/StepCheckboxForm';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getDataTypeSelectedAttributeCode(state),
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
  initialValues: {
    attributeTypeCode: 'Checkbox',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const StepDataCheckboxAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(StepCheckboxForm);
export default StepDataCheckboxAttributeContainer;
