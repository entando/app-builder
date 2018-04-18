import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import MonoListStepAttributeForm from 'ui/common/form/MonolistStepAttributeForm';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataMonolistStepAttributeContainer =
connect(mapStateToProps, mapDispatchToProps)(MonoListStepAttributeForm);
export default DataMonolistStepAttributeContainer;
