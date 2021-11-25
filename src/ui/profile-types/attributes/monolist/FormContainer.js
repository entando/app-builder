import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '@entando/messages';
import { formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';
import {
  setActionMode,
  fetchAttributeFromProfileType,
  fetchProfileTypeAttribute,
  sendPutAttributeFromProfileTypeMonolist,
  fetchNestedAttribute,
  sendPostAttributeFromProfileTypeMonolist,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/profile-types/actions';
import {
  getActionModeProfileTypeSelectedAttribute,
  getAttributeSelectFromProfileType,
  getProfileTypeSelectedAttribute,
  getProfileTypeAttributesIdList,
  getSelectedCompositeAttributes,
} from 'state/profile-types/selectors';
import {
  TYPE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/profile-types/const';

import {
  ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
} from 'app-init/router';

import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeProfileTypeSelectedAttribute(state),
  attributeCode: params.attributeCode,
  profileTypeCode: params.entityCode,
  isIndexable: formValueSelector('attribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('attribute')(state, 'nestedAttribute.type'),
  selectedAttribute: getAttributeSelectFromProfileType(state),
  selectedAttributeTypeForAddComposite: getProfileTypeSelectedAttribute(state),
  selectedAttributeType: formValueSelector('attribute')(state, 'type'),
  attributesList: getProfileTypeAttributesIdList(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: ({
    attributeCode, profileTypeCode, mode,
  }) => {
    dispatch(clearErrors());
    if (mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchProfileTypeAttribute(
        profileTypeCode,
        TYPE_COMPOSITE,
        () => (
          history.push(routeConverter(ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD, {
            entityCode: profileTypeCode,
            attributeCode,
          }))
        ),
        '',
        'attribute',
      ));
    } else {
      dispatch(fetchAttributeFromProfileType('attribute', profileTypeCode, attributeCode));
    }
  },
  onFetchNestedAttribute: ({ contentTypeCode, type, mode }) => {
    if (mode !== MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchNestedAttribute(contentTypeCode, type));
    }
  },
  onSubmit: (values, mode, selectedAttribute) => {
    if (mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(sendPostAttributeFromProfileTypeMonolist(
        selectedAttribute,
        params.entityCode,
        history,
      ));
    } else {
      dispatch(sendPutAttributeFromProfileTypeMonolist(values, params.entityCode, history));
    }
  },
  onAddAttribute: ({ profileTypeCode, type }) => {
    dispatch(setActionMode(MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE));
    dispatch(fetchProfileTypeAttribute(
      profileTypeCode,
      type,
      () => history.push(routeConverter(ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, {
        entityCode: profileTypeCode,
      })),
      type,
      'addAttribute',
    ));
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(MonolistAttributeForm));
