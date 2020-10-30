import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { FieldArray } from 'redux-form';
import { Row, Col } from 'patternfly-react';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

import NavigationBarExpressionsList from 'ui/widgets/config/forms/NavigationBarExpressionsList';
import NavigationBarTargetPage from 'ui/widgets/config/forms/NavigationBarTargetPage';
import NavigatorBarOperator from 'ui/widgets/config/forms/NavigatorBarOperator';
import AppTourContainer from 'ui/app-tour/AppTourContainer';

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
      intl,
      language,
      pages,
      onAddNewExpression,
      addConfig,
      loading,
      initialValues,
      onSpecificPageChoose,
      appTourProgress,
    } = this.props;

    const expressionsNotAvailable =
    values => (values && Array.isArray(values) && values.length > 0 ? undefined : <FormattedMessage id="validateForm.required" />);

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
                    validate={expressionsNotAvailable}
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
          <AppTourContainer />
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
  language: PropTypes.string,
  onAddNewExpression: PropTypes.func.isRequired,
  addConfig: PropTypes.shape({}),
  initialValues: PropTypes.shape({}).isRequired,
  fetchExpressions: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSpecificPageChoose: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string,
};

NavigationBarConfigForm.defaultProps = {
  pages: [],
  language: 'en',
  addConfig: {},
  loading: null,
  appTourProgress: '',
};
