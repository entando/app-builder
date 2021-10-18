import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Icon } from 'patternfly-react';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import { BUNDLE_GROUP_FILTER_ID } from 'ui/component-repository/components/list/ComponentListWrapper';
import { fetchBundleGroups } from 'state/component-repository/hub/actions';
import { getBundleGroups, getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { getCurrentPage, getPageSize } from 'state/pagination/selectors';

export const FORM_NAME = 'hubBundleGroupSearchForm';

const msgs = defineMessages({
  chooseAnOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
});

const BundleGroupAutoCompleteBody = (props) => {
  const { intl, handleSubmit, onSubmit } = props;
  const dispatch = useDispatch();
  const activeRegistry = useSelector(getSelectedRegistry);
  const bundlegroups = useSelector(getBundleGroups);
  const page = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  useEffect(
    () => { dispatch(fetchBundleGroups(activeRegistry.url)); },
    [activeRegistry.url, dispatch],
  );
  return (
    <form className="SearchForm__container" onSubmit={handleSubmit(values => onSubmit(values, activeRegistry.url, { page, pageSize }))}>
      <Field
        component={RenderDropdownTypeaheadInput}
        name={BUNDLE_GROUP_FILTER_ID}
        options={bundlegroups}
        labelKey="name"
        valueKey="bundleGroupId"
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
};

BundleGroupAutoCompleteBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.isRequired,
  onSubmit: PropTypes.isRequired,
};

const BundleGroupAutoComplete = reduxForm({
  form: FORM_NAME,
})(BundleGroupAutoCompleteBody);

export default injectIntl(BundleGroupAutoComplete);
