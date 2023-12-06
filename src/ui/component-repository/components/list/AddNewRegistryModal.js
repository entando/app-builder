import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'patternfly-react';
import { Field, withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { getRegistries } from 'state/component-repository/hub/selectors';
import { sendPostRegistry } from 'state/component-repository/hub/actions';
import { setVisibleModal } from 'state/modal/actions';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';

export const ADD_NEW_REGISTRY_MODAL_ID = 'AddNewRegistryModal';

export const mustBeUnique = (values, value, key) => (value && values && values.includes(value) ? <FormattedMessage id={`hub.newRegistry.${key}.error`} /> : undefined);

export const protocolCompliance = (value) => {
  // get current protocol from window.location.protocol
  const currentProtocol = window.location.protocol;
  // if current protocol is https, then the protocol must be https
  if (currentProtocol === 'https:' && value && value.startsWith('http://')) {
    return <FormattedMessage id="hub.newRegistry.protocol.error" />;
  }
  return undefined;
};

const AddNewRegistryModalForm = ({
  isValid, resetForm, values,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const existingRegistries = useSelector(getRegistries);

  const names = existingRegistries.map(reg => reg.name);
  const urls = existingRegistries.map(reg => reg.url);

  const validateName = value => convertReduxValidationsToFormikValidations(value, [currVal => mustBeUnique(names, currVal, 'name')]);
  const validateUrl = value => convertReduxValidationsToFormikValidations(value, [currVal => mustBeUnique(urls, currVal, 'url'), protocolCompliance]);

  const handleSave = (formValues) => {
    setLoading(true);
    dispatch(sendPostRegistry(formValues)).then((isSuccess) => {
      setLoading(false);
      resetForm();
      if (isSuccess) {
        dispatch(setVisibleModal(''));
      }
    }).catch(() => {
      setLoading(false);
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const buttons = [
    <Button
      bsStyle="primary"
      type="submit"
      id="InstallationPlanModal__button-ok"
      disabled={!isValid || loading}
      onClick={() => handleSave(values)}
    >
      <FormattedMessage id="app.save" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="hub.newRegistry" /></Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={ADD_NEW_REGISTRY_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      modalClassName="InstallationPlanModal"
      closeLabel="app.cancel"
      modalCloseCleanup={handleCancel}
    >
      <form className="form-horizontal">
        <fieldset className="no-padding">
          <Field
            label={<FormLabel labelId="hub.newRegistry.name" required />}
            component={RenderTextInput}
            name="name"
            validate={validateName}
          />
          <Field
            label={<FormLabel labelId="hub.newRegistry.url" required />}
            component={RenderTextInput}
            name="url"
            validate={validateUrl}
          />
          <Field
            label={<FormLabel labelId="hub.newRegistry.apiKey" />}
            component={RenderTextInput}
            name="apiKey"
          />
        </fieldset>
      </form>
    </GenericModalContainer>
  );
};

AddNewRegistryModalForm.propTypes = {
  isValid: PropTypes.bool,
  resetForm: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    apiKey: PropTypes.string,
  }).isRequired,
};

AddNewRegistryModalForm.defaultProps = {
  isValid: false,
};

const AddNewRegistryModal = withFormik({
  mapPropsToValues: () => {
    const values = {
      name: '',
      url: '',
      apiKey: '',
    };
    return values;
  },
  displayName: 'addNewRegistryModalForm',
  validateOnMount: true,
  enableReinitialize: true,
  validationSchema: () => (
    Yup.object().shape({
      name: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      url: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      apiKey: Yup.string(),
    })),
})(AddNewRegistryModalForm);

export default AddNewRegistryModal;
