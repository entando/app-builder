import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { makeRequest, METHODS } from '@entando/apimanager';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import ContentPicker from 'ui/widgets/config/forms/ContentPicker';

const noPaging = { page: 1, pageSize: 0 };

const getContents = (page, params = '') =>
  makeRequest(
    {
      uri: `/api/plugins/cms/contents${params}`,
      method: METHODS.GET,
      mockResponse: [],
      contentType: 'application/json',
      useAuthentication: true,
      errors: () => [],
    },
    page,
  );

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

const getFilteredContents = (formState) => {
  const filter = toFilter(formState);
  return getContents(noPaging, convertToQueryString(filter))
    .then(res => res.json())
    .then(json => json.payload);
};

export const mapStateToProps = (state, ownProps) => ({
  contentTypeList: getContentTypeList(state),
  contentStatusList: [{ code: 'draft', name: 'Draft' }, { code: 'ready', name: 'Ready' }],
  fetchContents: () => getFilteredContents(formValueSelector(ownProps.form)(state, 'typeCode', 'status')),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContentTypeListPaged(noPaging));
  },
  onSubmit: (values) => {
    console.log('picked: ', values);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(ContentPicker);
