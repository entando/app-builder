import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';

const msgs = defineMessages({
  code: {
    id: 'pageTree.searchForm.code',
    defaultMessage: 'Code',
  },
});

export const PageSearchFormBody = ({ intl, handleSubmit }) => {
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="PageSearchForm form-horizontal well">
      <h3><FormattedMessage id="app.search" /></h3>
      <FormGroup>
        <Row>
          <label className="control-label col-xs-3" htmlFor="pagecode">
            <FormattedMessage id="pageTree.searchForm.code" />
          </label>
          <Col xs={8}>
            <Field
              id="pagecode"
              component="input"
              className="form-control"
              name="pageCodeToken"
              placeholder={intl.formatMessage(msgs.code)}
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
              className="pull-right PageSearchForm__save"
            >
              <FormattedMessage id="app.search" />
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </form>

  );
};

PageSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const PageSearchForm = reduxForm({
  form: 'pageSearch',
})(PageSearchFormBody);

export default injectIntl(PageSearchForm);
