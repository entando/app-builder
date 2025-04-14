import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { withFormik, FieldArray, Form } from 'formik';
import { Button, Row, Col } from 'patternfly-react';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

import NavigationBarExpressionsList from 'ui/widgets/config/forms/NavigationBarExpressionsList';
import NavigationBarTargetPage from 'ui/widgets/config/forms/NavigationBarTargetPage';
import NavigatorBarOperator from 'ui/widgets/config/forms/NavigatorBarOperator';
import AppTourContainer from 'ui/app-tour/AppTourContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { MODE_CLONE } from 'ui/widgets/common/WidgetForm';
import WidgetConfigPortal from 'ui/widgets/config/WidgetConfigPortal';

class NavigationBarConfigFormBody extends PureComponent {
  componentDidMount() {
    const { onDidMount, initialValues, fetchExpressions } = this.props;
    onDidMount(this.props);
    if (!lodash.isEmpty(initialValues)) {
      fetchExpressions(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    const { initialValues, fetchExpressions } = this.props;
    const { initialValues: prevValues } = prevProps;
    if (JSON.stringify(initialValues) !== JSON.stringify(prevValues)) {
      fetchExpressions(this.props);
    }
  }

  render() {
    const {
      handleSubmit,
      isValid,
      isSubmitting,
      intl,
      isDirty,
      onCancel,
      onDiscard,
      onSave,
      language,
      pages,
      onAddNewExpression,
      onRemoveExpression,
      onSwapExpressions,
      loading,
      initialValues,
      onSpecificPageChoose,
      appTourProgress,
      mode,
      values,
      handleChange,
      setFieldValue,
      submitForm,
    } = this.props;

    const handleCancelClick = () => {
      if (isDirty && appTourProgress !== APP_TOUR_STARTED) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const expressionsNotAvailable = !values.expressions || values.expressions.length === 0;

    return (
      <div className="NavigationBarConfigForm">
        <h5>
          <span className="icon fa fa-puzzle-piece" title="Widget" />
          {' '}
          <FormattedMessage id="widget.navigationBar.config.title" defaultMessage="Navigation - Bar" />
        </h5>
        <Form onSubmit={handleSubmit} className="form-horizontal">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="widget.navigationBar.config.expressionList"
                  requireFields={false}
                />
                <Col lg={6} md={10} smOffset={2} className="no-padding">
                  <FieldArray
                    name="expressions"
                  >
                    {() => (<NavigationBarExpressionsList
                      expressions={values.expressions}
                      pages={pages}
                      language={language}
                      loading={loading}
                      intl={intl}
                      navSpec={initialValues.navSpec}
                      remove={(index) => { onRemoveExpression(index, setFieldValue, values); }}
                      swap={(indexA, indexB) =>
                        onSwapExpressions(indexA, indexB, setFieldValue, values)}
                    />)}
                  </FieldArray>
                </Col>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="widget.navigationBar.config.page"
                  requireFields={false}
                />
                <Col lg={10} md={10} smOffset={2} className="no-padding">
                  <NavigationBarTargetPage
                    pages={pages}
                    intl={intl}
                    language={language}
                    onSpecificPageChoose={onSpecificPageChoose}
                    appTourProgress={appTourProgress}
                    handleChange={handleChange}
                  />
                </Col>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="widget.navigationBar.config.operator"
                  requireFields={false}
                />
                <Col lg={12} md={12} className="no-padding">
                  <NavigatorBarOperator
                    addConfig={values.addConfig}
                    onAddNewExpression={() =>
                      onAddNewExpression(values, appTourProgress, setFieldValue)}
                    appTourProgress={appTourProgress}
                  />
                </Col>
              </fieldset>
            </Col>
          </Row>
          {mode !== MODE_CLONE &&
            <Row>
              <Col xs={12}>
                <WidgetConfigPortal>
                  <Button
                    className="pull-right NavigationBarConfigForm__save-btn app-tour-step-16"
                    type="submit"
                    bsStyle="primary"
                    disabled={!isValid || isSubmitting || expressionsNotAvailable}
                    onClick={() => onSave(submitForm)}
                  >
                    <FormattedMessage id="app.save" />
                  </Button>
                  <Button
                    className="pull-right NavigationBarConfigForm__cancel-btn"
                    bsStyle="default"
                    onClick={handleCancelClick}
                  >
                    <FormattedMessage id="app.cancel" />
                  </Button>
                </WidgetConfigPortal>
                {
                  appTourProgress !== APP_TOUR_STARTED && (
                    <ConfirmCancelModalContainer
                      contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                      invalid={!isValid}
                      submitting={isSubmitting}
                      onSave={onSave}
                      onDiscard={onDiscard}
                    />
                  )
                }
              </Col>
              <AppTourContainer />
            </Row>
          }
        </Form>
      </div>
    );
  }
}

NavigationBarConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  language: PropTypes.string,
  isDirty: PropTypes.bool.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAddNewExpression: PropTypes.func.isRequired,
  onRemoveExpression: PropTypes.func.isRequired,
  onSwapExpressions: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    navSpec: PropTypes.string,
  }).isRequired,
  fetchExpressions: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSpecificPageChoose: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string,
  mode: PropTypes.string,
  values: PropTypes.shape({
    addConfig: PropTypes.shape({}),
    expressions: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

NavigationBarConfigFormBody.defaultProps = {
  pages: [],
  language: 'en',
  loading: null,
  appTourProgress: '',
  mode: '',
};

const NavigationBarConfigForm = withFormik({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  mapPropsToValues: ({ initialValues }) => (
    {
      ...initialValues,
      addConfig: initialValues.addConfig || {},
      expressions: initialValues.expressions || [],
    }
  ),
  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },
})(NavigationBarConfigFormBody);

export default NavigationBarConfigForm;
