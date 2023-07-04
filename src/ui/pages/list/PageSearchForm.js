import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
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

export const PageSearchFormBody = ({ intl, onSubmit }) => {
  const initialValues = {
    pageCodeToken: '',
    searchType: 'code',
  };

  const onformSubmit = (values) => {
    const searchType = selectedTypeSearchParamMap[values.searchType];
    onSubmit({ ...values, searchType });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onformSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <form
          onSubmit={handleSubmit}
          className="PageSearchForm form-horizontal well"
        >
          <h3><FormattedMessage id="pageTree.searchForm.searchPageBy" /></h3>
          <FormGroup>
            <Row>
              <Col xs={12} sm={3} className="PageSearchForm__filter-searchby">
                <DropdownButton
                  title={intl.formatMessage({ id: `pageTree.searchForm.${values.searchType}` })}
                  id="attribute"
                  onSelect={handleChange('searchType')}
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
                  type="input"
                  className="form-control"
                  name="pageCodeToken"
                  placeholder={intl.formatMessage(msgs[values.searchType])}
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
      )}
    </Formik>
  );
};

PageSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default injectIntl(PageSearchFormBody);
