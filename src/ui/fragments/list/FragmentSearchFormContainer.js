import { connect } from 'react-redux';
import { fetchWidgetTypes, fetchPlugins, fetchFragments } from 'state/fragments/actions';
import FragmentSearchForm from 'ui/fragments/list/FragmentSearchForm';
import { getWidgetTypesOptions, getPluginsOptions } from 'state/fragments/selectors';
import { convertToQueryString, FILTER_OPERATORS } from 'util/queryStringManager';

const FIELD_OPERATORS = {
  code: FILTER_OPERATORS.EQUAL,
  widgetType: FILTER_OPERATORS.GREATER_THAN,
  plugin: FILTER_OPERATORS.LIKE,
};

export const mapStateToProps = state => ({
  widgetTypes: getWidgetTypesOptions(state),
  plugins: getPluginsOptions(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetTypes());
    dispatch(fetchPlugins());
  },
  // calls search API when available
  onSubmit: (values) => {
    dispatch(fetchFragments(1, convertToQueryString({
      formValues: values,
      operators: FIELD_OPERATORS,
      sorting: {
        attribute: 'code',
      },
    })));
  },
});

const FragmentSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FragmentSearchForm);
export default FragmentSearchFormContainer;
