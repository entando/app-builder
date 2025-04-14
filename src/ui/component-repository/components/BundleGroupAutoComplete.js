import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Field, withFormik } from 'formik';
import { Button, Icon } from 'patternfly-react';
import RenderDropdownTypeaheadInput from 'ui/common/formik-field/RenderDropdownTypeaheadInput';
import { BUNDLE_GROUP_FILTER_ID } from 'ui/component-repository/components/list/ComponentListWrapper';
import { fetchBundleGroups, setBundleGroupIdFilter } from 'state/component-repository/hub/actions';


export const FORM_NAME = 'hubBundleGroupSearchForm';

const msgs = defineMessages({
  chooseAnOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
});

const BundleGroupAutoCompleteBody = (props) => {
  const {
    intl, handleSubmit, activeRegistry, bundlegroups, submitForm, resetForm,
  } = props;
  const dispatch = useDispatch();

  useEffect(
    () => { dispatch(fetchBundleGroups(activeRegistry.id)); },
    [activeRegistry.id, dispatch],
  );

  const clearSearch = () => {
    resetForm();
    dispatch(setBundleGroupIdFilter());
    submitForm();
  };

  const handleChange = (value) => {
    dispatch(setBundleGroupIdFilter(value));
    submitForm();
  };

  return (
    <form className="SearchForm__container" onSubmit={handleSubmit}>
      <Field
        component={RenderDropdownTypeaheadInput}
        name={BUNDLE_GROUP_FILTER_ID}
        options={bundlegroups}
        labelKey="name"
        onChange={value => handleChange(value)}
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
      <div className="SearchForm__button-wrapper">
        <Button
          className="btn-transparent SearchForm__button-close"
          onClick={clearSearch}
        >
          <Icon name="close" />
        </Button>
      </div>
    </form>
  );
};

BundleGroupAutoCompleteBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  activeRegistry: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  bundlegroups: PropTypes.arrayOf().isRequired,
};

const BundleGroupAutoComplete = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  handleSubmit: (values, {
    props: {
      onSubmit, activeRegistry, page, pageSize,
    },
  }) => {
    onSubmit(
      values, activeRegistry.id,
      { page, pageSize },
    );
  },
})(BundleGroupAutoCompleteBody);

export default injectIntl(BundleGroupAutoComplete);
