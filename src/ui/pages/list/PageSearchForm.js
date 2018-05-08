import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';
import { Row, Col, FormGroup, Button } from 'patternfly-react';


export const PageSearchFormBody = (props) => {
  const { handleSubmit } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="PageSearchForm form-horizontal well">
      <h3><FormattedMessage id="app.search" /></h3>
      <FormGroup>
        <Row>
          <label className="control-label col-xs-2" htmlFor="pagecode">
            <FormattedMessage id="pageTree.searchForm.code" />
          </label>
          <Col xs={9}>
            <Field
              id="pagecode"
              component="input"
              className="form-control"
              name="pageCodeToken"
              placeholder={formattedText('pageTree.searchForm.code')}
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
  handleSubmit: PropTypes.func.isRequired,
};

const PageSearchForm = reduxForm({
  form: 'pageSearch',
})(PageSearchFormBody);

export default PageSearchForm;
