import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { formValueSelector } from 'redux-form';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import ContentPicker from 'ui/widget-forms/ContentPicker';
import { getContents } from 'api/contents';
import { parseJoinGroups } from 'helpers/joinGroups';

const noPaging = { page: 1, pageSize: 0 };

const toFilter = formState => Object.keys(formState).reduce((acc, key) => ({
  formValues: {
    ...acc.formValues,
    [key]: formState[key],
  },
  operators: {
    ...acc.operators,
    [key]: FILTER_OPERATORS.EQUAL,
  },
}), {
  formValues: {},
  operators: {},
});

const getFilteredContents = (formState, ownerGroup, joinGroupsToParse) => {
  const filter = toFilter(formState);
  const filterParams = convertToQueryString(filter);
  const ownerGroupQuery = ownerGroup ? `&forLinkingWithOwnerGroup=${ownerGroup}` : '';
  const joinGroups = parseJoinGroups(joinGroupsToParse);
  const joinGroupsQuery = (joinGroups && joinGroups.length > 0)
    ? joinGroups.reduce((acc, curr, index) => `${acc}&forLinkingWithExtraGroups[${index}]=${curr}`, '') : '';
  const contentParams = `${filterParams || '?'}&status=published${ownerGroupQuery}${joinGroupsQuery}`;
  return getContents(noPaging, contentParams)
    .then(res => res.json())
    .then(json => json.payload);
};

export const mapStateToProps = (state, ownProps) => ({
  contentTypeList: getContentTypeList(state),
  contentStatusList: [{ code: 'draft', name: 'Draft' }, { code: 'ready', name: 'Ready' }],
  fetchContents: () => getFilteredContents(
    formValueSelector(ownProps.form)(state, 'typeCode', 'status'),
    ownProps.ownerGroup, ownProps.joinGroups,
  ),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContentTypeListPaged(noPaging));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentPicker));
