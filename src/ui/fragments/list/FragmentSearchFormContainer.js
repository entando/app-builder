import { connect } from 'react-redux';
import { fetchWidgetTypes, fetchPlugins, fetchFragments } from 'state/fragments/actions';
import FragmentSearchForm from 'ui/fragments/list/FragmentSearchForm';
import { getWidgetTypesOptions, getPluginsOptions } from 'state/fragments/selectors';
import { convertToQueryString, DEFAULT_SORT_DIRECTION } from 'util/queryStringManager';

const FIELD_OPERATORS = {
  code: 'eq',
  widgetType: 'eq',
  plugin: 'eq',
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
  // calls search API when avaible
  onSubmit: (values) => {
    dispatch(fetchFragments(1, convertToQueryString({
      formValues: values,
      operators: FIELD_OPERATORS,
      sorting: {
        attribute: 'code',
        direction: DEFAULT_SORT_DIRECTION,
      },
    })));
  },
});

const FragmentSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FragmentSearchForm);
export default FragmentSearchFormContainer;
