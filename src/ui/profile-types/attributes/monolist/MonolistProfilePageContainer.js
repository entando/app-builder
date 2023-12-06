import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAttributeFromProfileType } from 'state/profile-types/actions';
import {
  getActionModeProfileTypeSelectedAttribute,
  getSelectedAttributeNestedType,
  getSelectedAttributeNestedIndexable,
  getAttributeTypeSelectFromProfileType,
} from 'state/profile-types/selectors';
import { MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE } from 'state/profile-types/const';

import MonolistPage from 'ui/profile-types/attributes/monolist/MonolistPage';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeProfileTypeSelectedAttribute(state) || '',
  attributeCode: params.attributeCode,
  entityCode: params.entityCode,
  profileTypeCode: params.entityCode,
  isIndexable: getSelectedAttributeNestedIndexable(state),
  type: getSelectedAttributeNestedType(state),
  selectedAttribute: getAttributeTypeSelectFromProfileType(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: ({ attributeCode, profileTypeCode, mode }) => {
    if (mode !== MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchAttributeFromProfileType('attribute', profileTypeCode, attributeCode));
    }
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonolistPage));
