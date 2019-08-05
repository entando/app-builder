import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';

import { fetchAttributeFromDataType } from 'state/data-types/actions';
import { getActionModeDataTypeSelectedAttribute } from 'state/data-types/selectors';
import { MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE } from 'state/data-types/const';

import MonolistPage from 'ui/data-types/attributes/monolist/MonolistPage';


export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeDataTypeSelectedAttribute(state) || '',
  attributeCode: params.attributeCode,
  entityCode: params.entityCode,
  dataTypeCode: params.entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('monoListAttribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, dataTypeCode, mode }) => {
    if (mode !== MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchAttributeFromDataType('monoListAttribute ', dataTypeCode, attributeCode));
    }
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonolistPage));
