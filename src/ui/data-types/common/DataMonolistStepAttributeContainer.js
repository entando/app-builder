import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import MonolistStepAttribute from 'ui/common/form/MonolistStepAttribute';
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
connect(mapStateToProps, mapDispatchToProps)(MonolistStepAttribute);
export default DataMonolistStepAttributeContainer;
