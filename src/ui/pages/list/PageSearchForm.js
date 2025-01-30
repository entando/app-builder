import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { FormGroup /* , Button */ } from 'patternfly-react';
import DropdownButton from 'ui/common/dropdown-button/DropdownButton';
import Search from 'ui/common/Search';

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
      className="PageSearchForm"
    >
      <h3><FormattedMessage id="pageTree.searchForm.searchPageBy" /></h3>
      <FormGroup>
        <DropdownButton
          title={intl.formatMessage({ id: `pageTree.searchForm.${searchType}` })}
          id="attribute"
          onSelect={e => setSearchType(e)}
          className="PageSearchForm__filter-searchby-dropdown"
          options={selectOptions}
          intl={intl}
        />
        <Field
          id="pagecode"
          component={Search}
          reverse
          name="pageCodeToken"
          placeholder={intl.formatMessage(msgs[searchType])}
        />
        {/* <Button
          type="submit"
          bsStyle="primary"
          className="pull-right PageSearchForm__save"
        >
          <FormattedMessage id="app.search" />
        </Button> */}
      </FormGroup>
    </form >

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
