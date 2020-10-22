import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { FieldArray } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

import NavigationBarExpressionsList from 'ui/widgets/config/forms/NavigationBarExpressionsList';
import NavigationBarTargetPage from 'ui/widgets/config/forms/NavigationBarTargetPage';
import NavigatorBarOperator from 'ui/widgets/config/forms/NavigatorBarOperator';
import AppTourContainer from 'ui/app-tour/AppTourContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

export default class NavigationBarConfigForm extends PureComponent {
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
      invalid,
      submitting,
      intl,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      language,
      pages,
      onAddNewExpression,
      addConfig,
      expressions,
      loading,
      initialValues,
      onSpecificPageChoose,
      appTourProgress,
    } = this.props;

    const handleCancelClick = () => {
      if (dirty && appTourProgress !== APP_TOUR_STARTED) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const expressionsNotAvailable = !expressions || expressions.length === 0;

    return (
      <div className="NavigationBarConfigForm">
        <h5>
          <span className="icon fa fa-puzzle-piece" title="Widget" />
          {' '}
          <FormattedMessage id="widget.navigationBar.config.title" defaultMessage="Navigation - Bar" />
        </h5>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="widget.navigationBar.config.expressionList"
                  requireFields={false}
                />
                <Col lg={6} md={10} smOffset={2} className="no-padding">
                  <FieldArray
                    component={NavigationBarExpressionsList}
                    name="expressions"
                    pages={pages}
                    language={language}
                    loading={loading}
                    intl={intl}
                    navSpec={initialValues.navSpec}
                  />
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
                    addConfig={addConfig}
                    onAddNewExpression={() => onAddNewExpression(addConfig, appTourProgress)}
                    appTourProgress={appTourProgress}
                  />
                </Col>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right NavigationBarConfigForm__save-btn app-tour-step-16"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting || expressionsNotAvailable}
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
              {
                appTourProgress !== APP_TOUR_STARTED && (
                  <ConfirmCancelModalContainer
                    contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                    invalid={invalid}
                    submitting={submitting}
                    onSave={onSave}
                    onDiscard={onDiscard}
                  />
                )
              }
            </Col>
            <AppTourContainer />
          </Row>
        </form>
      </div>
    );
  }
}

NavigationBarConfigForm.propTypes = {
  intl: intlShape.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  language: PropTypes.string,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAddNewExpression: PropTypes.func.isRequired,
  addConfig: PropTypes.shape({}),
  expressions: PropTypes.arrayOf(PropTypes.shape({})),
  initialValues: PropTypes.shape({}).isRequired,
  fetchExpressions: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSpecificPageChoose: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string,
};

NavigationBarConfigForm.defaultProps = {
  pages: [],
  dirty: false,
  language: 'en',
  addConfig: {},
  expressions: [],
  loading: null,
  appTourProgress: '',
};
