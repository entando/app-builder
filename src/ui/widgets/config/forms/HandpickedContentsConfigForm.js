import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import ContentTableRenderer from 'ui/widgets/config/forms/ContentTableRenderer';

class HandpickedContentsConfigFormBody extends PureComponent {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const {
      contentModels,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;

    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <FieldArray
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

HandpickedContentsConfigFormBody.propTypes = {
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const HandpickedContentsConfigForm = reduxForm({
  form: 'widgets.singleContentConfig',
})(HandpickedContentsConfigFormBody);

export default HandpickedContentsConfigForm;
