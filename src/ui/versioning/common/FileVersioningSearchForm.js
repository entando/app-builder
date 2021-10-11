import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import {
  Row,
  Col,
  FormGroup,
  Button,
} from 'patternfly-react';

const msgs = defineMessages({
  code: {
    id: 'cms.versioning.search.desclabel',
    defaultMessage: 'Description',
  },
});

export const FileVersioningSearchFormBody = ({ intl, handleSubmit }) => {
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <Row className="VersioningSearchForm">
      <Col xs={6} xsOffset={3}>
        <form onSubmit={onSubmit} className="VersioningSearchForm__form form-horizontal well">
          <h3><FormattedMessage id="cms.versioning.search.formtitle" defaultMessage="Search" /></h3>
          <FormGroup>
            <Row>
              <Col md={2} mdOffset={1}>
                <label className="control-label col-xs-2" htmlFor="description">
                  <FormattedMessage id="cms.versioning.search.desclabel" defaultMessage="Description" />
                </label>
              </Col>
              <Col md={8}>
                <Field
                  id="description"
                  component="input"
                  className="form-control"
                  name="description"
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
                  className="pull-right VersioningSearchForm__save"
                >
                  <FormattedMessage id="cms.versioning.search.formtitle" defaultMessage="Search" />
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </Col>
    </Row>
  );
};

FileVersioningSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const VersioningSearchForm = reduxForm({
  form: 'fileVersioningSearch',
})(FileVersioningSearchFormBody);

export default injectIntl(VersioningSearchForm);
