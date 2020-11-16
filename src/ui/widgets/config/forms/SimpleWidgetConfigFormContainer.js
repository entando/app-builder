import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { reduxForm } from 'redux-form';
import { clearErrors, addToast, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import SimpleWidgetConfigForm from 'ui/widgets/config/forms/SimpleWidgetConfigForm';
import { updateConfiguredPageWidget } from 'state/widget-config/actions';
import { initConfigPage } from 'state/page-config/actions';

export const ID = 'navigationBarWidgetForm';

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig || {},
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (widgetConfig) => {
    dispatch(clearErrors());
    const {
      pageCode, frameId, intl, widgetCode,
    } = ownProps;
    const params = { pageCode, framePos: frameId, widgetCode };
    return dispatch(updateConfiguredPageWidget(widgetConfig, params)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage({ id: 'widget.update.success' }),
          TOAST_SUCCESS,
        ));
        return dispatch(initConfigPage(pageCode));
      }
      return dispatch(addToast(
        'Error',
        TOAST_ERROR,
      ));
    });
  },
});

const SimpleWidgetConfigFormContainer = injectIntl(reduxForm({
  form: ID,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SimpleWidgetConfigForm));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(SimpleWidgetConfigFormContainer);
