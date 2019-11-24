import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { FieldArray, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import ContentTableRenderer from 'ui/widgets/config/forms/ContentTableRenderer';

class HandpickedContentsConfigForm extends PureComponent {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const {
      widgetConfig,
      contentModels,
      handleSubmit,
      invalid,
      submitting,
      intl,
    } = this.props;
    console.log('HandpickedContentsConfigForm', widgetConfig);
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <FieldArray
                intl={intl}
                component={ContentTableRenderer}
                contentModels={contentModels}
                name="contents"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }
}

const SingleContentConfigForm = reduxForm({
  form: 'widgets.singleContentConfig',
})(HandpickedContentsConfigForm);

HandpickedContentsConfigForm.propTypes = {
  intl: intlShape.isRequired,
  widgetConfig: PropTypes.shape({}).isRequired,
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default SingleContentConfigForm;
