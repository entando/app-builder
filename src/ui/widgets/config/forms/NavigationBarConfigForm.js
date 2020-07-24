import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { FieldArray } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

import NavigationBarExpressionsList from 'ui/widgets/config/forms/NavigationBarExpressionsList';

export default class NavigationBarConfigForm extends PureComponent {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
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
    } = this.props;
    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <Fragment>
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
                  />
                </Col>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right AddContentTypeFormBody__save--btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
              <Button
                className="pull-right AddContentTypeFormBody__cancel--btn"
                bsStyle="default"
                onClick={handleCancelClick}
              >
                <FormattedMessage id="app.cancel" />
              </Button>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                invalid={invalid}
                submitting={submitting}
                onSave={onSave}
                onDiscard={onDiscard}
              />
            </Col>
          </Row>
        </form>
      </Fragment>
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
  language: PropTypes.string.isRequired,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

NavigationBarConfigForm.defaultProps = {
  pages: [],
  dirty: false,
};
