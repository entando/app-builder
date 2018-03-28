import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import { Row, Col, FormGroup, Button } from 'patternfly-react';

export const LabelSearchFormBody = ({ handleSubmit }) => {
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="LabelSearchForm form-horizontal well">
      <h3><FormattedMessage id="label.searchForm.title" /></h3>
      <FormGroup>
        <Row>
          <label className="control-label col-sm-2" htmlFor="username">
            <FormattedMessage id="label.searchForm.text" />
          </label>
          <Col sm={9}>
            <Field
              id="text"
              component="input"
              className="LabelSearchForm__text-field form-control"
              name="text"
              placeholder={formattedText('label.searchForm.text')}
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
  handleSubmit: PropTypes.func.isRequired,
};

const LabelSearchForm = reduxForm({
  form: 'labelSearch',
})(LabelSearchFormBody);

export default LabelSearchForm;
