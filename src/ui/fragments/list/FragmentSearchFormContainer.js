import { connect } from 'react-redux';
import { omitBy, isEmpty } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { fetchWidgetList } from 'state/widgets/thunks';
import { fetchPlugins, fetchFragments } from 'state/fragments/actions';
import FragmentSearchForm from 'ui/fragments/list/FragmentSearchForm';
import { getWidgetTypesOptions, getPluginsOptions } from 'state/fragments/selectors';

export const mapStateToProps = state => ({
  widgetTypes: getWidgetTypesOptions(state),
  plugins: getPluginsOptions(state),
});

const msgs = defineMessages({
  appAll: {
    id: 'app.all',
    defaultMessage: 'All Apps',
  },
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onWillMount: () => {
    dispatch(fetchWidgetList());
    dispatch(fetchPlugins());
  },

  onSubmit: ({ code, widgetType, pluginCode }) => {
    const formValues = omitBy({
      code,
      'widgetType.code': widgetType && widgetType !== intl.formatMessage(msgs.appAll) ? widgetType : null,
      pluginCode: pluginCode && pluginCode !== intl.formatMessage(msgs.appAll) ? pluginCode : null,
    }, isEmpty);

    const operators = Object.keys(formValues).reduce((acc, curr) => {
      if (curr === 'code') {
        return { ...acc, [curr]: FILTER_OPERATORS.LIKE };
      }
      if (curr === 'widgetType.code' || curr === 'pluginCode') {
        return { ...acc, [curr]: FILTER_OPERATORS.EQUAL };
      }
      return acc;
    }, {});

    const queryString = Object.keys(formValues).length ?
      convertToQueryString({
        formValues,
        operators,
        sorting: {
          attribute: 'code',
        },
      }) : '';
    dispatch(fetchFragments({ page: 1, pageSize: 10 }, queryString));
  },
});

const FragmentSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(FragmentSearchForm);

export default injectIntl(FragmentSearchFormContainer);
