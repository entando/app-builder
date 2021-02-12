import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button, DropdownButton, MenuItem } from 'patternfly-react';

const msgs = defineMessages({
  code: {
    id: 'pageTree.searchForm.search.code',
  },
  name: {
    id: 'pageTree.searchForm.search.name',
  },
});

const selectOptions = [
  {
    label: 'pageTree.searchForm.name',
    value: 'name',
  },
  {
    label: 'pageTree.searchForm.code',
    value: 'code',
  },
];

const selectedTypeSearchParamMap = {
  code: 'pageCodeToken',
  name: 'title',
};

export const PageSearchFormBody = ({ intl, handleSubmit, onSubmit }) => {
  const [searchType, setSearchType] = useState('code');
  return (
    <form
      onSubmit={handleSubmit(values =>
        onSubmit({ ...values, searchType: selectedTypeSearchParamMap[searchType] }))}
      className="PageSearchForm form-horizontal well"
    >
      <h3><FormattedMessage id="pageTree.searchForm.searchPageBy" /></h3>
      <FormGroup>
        <Row>
          <Col xs={12} sm={3} className="PageSearchForm__filter-searchby">
            <DropdownButton
              title={intl.formatMessage({ id: `pageTree.searchForm.${searchType}` })}
              id="attribute"
              onSelect={e => setSearchType(e)}
              className="PageSearchForm__filter-searchby-dropdown"
            >
              {selectOptions.map(option => (
                <MenuItem key={option.value} eventKey={option.value}>
                  {intl.formatMessage({ id: option.label })}
                </MenuItem>
                ))}
            </DropdownButton>
          </Col>
          <Col xs={12} sm={8}>
            <Field
              id="pagecode"
              component="input"
              className="form-control"
              name="pageCodeToken"
              placeholder={intl.formatMessage(msgs[searchType])}
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
  onSubmit: PropTypes.func.isRequired,
};

const PageSearchForm = reduxForm({
  form: 'pageSearch',
})(PageSearchFormBody);

export default injectIntl(PageSearchForm);
