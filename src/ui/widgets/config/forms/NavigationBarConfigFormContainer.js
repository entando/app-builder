import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { reduxForm, formValueSelector, arrayPush, change } from 'redux-form';
import { clearErrors, addToast, TOAST_ERROR } from '@entando/messages';
import NavigationBarConfigForm from 'ui/widgets/config/forms/NavigationBarConfigForm';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';

import { sendGetNavigatorNavspecFromExpressions, sendGetNavigatorExpressionsFromNavspec } from 'state/widgets/actions';
import { getLoading } from 'state/loading/selectors';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep } from 'state/app-tour/actions';

export const NavigationBarWidgetID = 'navigationBarWidgetForm';

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig || {},
  pages: getSearchPages(state) || [],
  language: getLocale(state),
  widgetCode: ownProps.widgetCode,
  addConfig: formValueSelector(NavigationBarWidgetID)(state, 'addConfig'),
  expressions: formValueSelector(NavigationBarWidgetID)(state, 'expressions'),
  loading: getLoading(state).expressionList,
  appTourProgress: getAppTourProgress(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: ({ initialize, appTourProgress }) => {
    if (appTourProgress === APP_TOUR_STARTED) {
      dispatch(initialize({ addConfig: { spec: 'code', targetCode: 'homepage' } }));
    }
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
  fetchExpressions: (props) => {
    const { widgetConfig } = ownProps || {};
    const { navSpec } = widgetConfig || {};
    const { initialize } = props;
    if (navSpec) {
      dispatch(sendGetNavigatorExpressionsFromNavspec(navSpec)).then((res) => {
        if (res) {
          const { expressions = [] } = res;
          return dispatch(initialize({ expressions }));
        }
        return dispatch(addToast(
          'Error',
          TOAST_ERROR,
        ));
      });
    }
  },
  onAddNewExpression: (config, appTourProgress) => {
    const newExpression = { ...config };
    newExpression.specSuperLevel = config.specSuperLevel || 1;
    newExpression.specAbsLevel = config.specAbsLevel || 1;
    newExpression.operatorSubtreeLevel = config.operatorSubtreeLevel || '1';
    dispatch(arrayPush(NavigationBarWidgetID, 'expressions', newExpression));
    if (appTourProgress === APP_TOUR_STARTED) {
      dispatch(setAppTourLastStep(16));
    }
  },
  onSpecificPageChoose: (chosenPage, appTourProgress) => {
    if (appTourProgress === APP_TOUR_STARTED && chosenPage) {
      dispatch(change('navigationBarWidgetForm', 'addConfig.spec', 'code'));
      dispatch(setAppTourLastStep(15));
    }
  },
});

const beforeSubmit = (dispatch, { expressions }) => new Promise((resolve, reject) => {
  dispatch(clearErrors());
  return dispatch(sendGetNavigatorNavspecFromExpressions(expressions)).then((res) => {
    if (res) {
      dispatch(setAppTourLastStep(17));
      const payload = { navSpec: res.navSpec };
      dispatch(clearErrors());
      return resolve(payload);
    }
    return reject();
  });
});

const NavigationBarConfigFormContainer = injectIntl(reduxForm({
  form: NavigationBarWidgetID,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(NavigationBarConfigForm));

NavigationBarConfigFormContainer.reduxFormId = NavigationBarWidgetID;
NavigationBarConfigFormContainer.beforeSubmit = beforeSubmit;

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(NavigationBarConfigFormContainer);
