import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';

import { fetchAttributeFromContentType } from 'state/content-type/actions';
import { getActionModeContentTypeSelectedAttribute } from 'state/content-type/selectors';
import { MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE } from 'state/content-type/const';

import MonolistPage from 'ui/content-type/attributes/monolist/MonolistPage';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeContentTypeSelectedAttribute(state) || '',
  attributeCode: params.attributeCode,
  entityCode: params.entityCode,
  contentTypeCode: params.entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('monoListAttribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: ({ attributeCode, contentTypeCode, mode }) => {
    if (mode !== MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchAttributeFromContentType('monoListAttribute', contentTypeCode, attributeCode));
    }
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonolistPage));
