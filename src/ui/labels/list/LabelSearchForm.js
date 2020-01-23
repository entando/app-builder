import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';

const msgs = defineMessages({
  searchFormCode: {
    id: 'label.searchForm.code',
    defaultMessage: 'Code',
  },
});

export const LabelSearchFormBody = ({ intl, handleSubmit }) => {
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="LabelSearchForm form-horizontal well">
      <h3><FormattedMessage id="label.searchForm.title" /></h3>
      <FormGroup>
        <Row>
          <label className="control-label col-xs-2" htmlFor="username">
            <FormattedMessage id="label.searchForm.code" />
          </label>
          <Col xs={9}>
            <Field
              id="text"
              component="input"
              className="LabelSearchForm__text-field form-control"
              name="key"
              placeholder={intl.formatMessage(msgs.searchFormCode)}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xs={11}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right"
            >
              <FormattedMessage id="app.search" />
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </form>
  );
};

LabelSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const LabelSearchForm = reduxForm({
  form: 'labelSearch',
})(LabelSearchFormBody);

export default injectIntl(LabelSearchForm);
