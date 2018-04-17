import { connect } from 'react-redux';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { fetchWidgetList } from 'state/widgets/actions';
import { fetchPlugins, fetchFragments } from 'state/fragments/actions';
import FragmentSearchForm from 'ui/fragments/list/FragmentSearchForm';
import { getWidgetTypesOptions, getPluginsOptions } from 'state/fragments/selectors';

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
    dispatch(fetchWidgetList());
    dispatch(fetchPlugins());
  },
  // calls search API when available
  onSubmit: (values) => {
    dispatch(fetchFragments({ page: 1, pageSize: 10 }, convertToQueryString({
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
