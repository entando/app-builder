import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Icon } from 'patternfly-react';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import { BUNDLE_GROUP_ID } from 'ui/component-repository/components/list/ComponentListWrapper';

// @TODO replace with proper bundle groups
const BUNDLE_GROUPS = [
  {
    name: 'Group 1',
    code: 'group1',
  },
  {
    name: 'Group 2',
    code: 'group2',
  },
];

const msgs = defineMessages({
  chooseAnOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
});

const BundleGroupAutoCompleteBody = ({ intl, handleSubmit }) => (
  <form className="SearchForm__container" onSubmit={handleSubmit}>
    <Field
      component={RenderDropdownTypeaheadInput}
      name={BUNDLE_GROUP_ID}
      options={BUNDLE_GROUPS}
      labelKey="name"
      valueKey="code"
      labelSize={0}
      tourClass="BundleGroupAutoComplete"
      placeholder={intl.formatMessage(msgs.chooseAnOption)}
    />
    <div className="SearchForm__button-wrapper">
      <Button
        className="SearchForm__button"
        type="submit"
      >
        <Icon name="search" />
      </Button>
    </div>
  </form>
);

BundleGroupAutoCompleteBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.isRequired,
};

const BundleGroupAutoComplete = reduxForm({
  form: 'hubBundleGroupSearchForm',
})(BundleGroupAutoCompleteBody);

export default injectIntl(BundleGroupAutoComplete);
