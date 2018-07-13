import { connect } from 'react-redux';
import { fetchAttributeFromDataType } from 'state/data-types/actions';
import MonolistPage from 'ui/data-types/attributes/monolist/MonolistPage';
import { getParams } from '@entando/router';
import { formValueSelector } from 'redux-form';


export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  entityCode: getParams(state).entityCode,
  dataTypeCode: getParams(state).entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('monoListAttribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, dataTypeCode }) => {
    dispatch(fetchAttributeFromDataType('monoListAttribute', dataTypeCode, attributeCode));
  },
});

const MonolistPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(MonolistPage);
export default MonolistPageContainer;
