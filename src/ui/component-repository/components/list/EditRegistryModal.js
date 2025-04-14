import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Alert } from 'patternfly-react';
import { Field, withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { getRegistries } from 'state/component-repository/hub/selectors';
import { sendPutRegistry } from 'state/component-repository/hub/actions';
import { setInfo, setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { mustBeUnique, protocolCompliance } from 'ui/component-repository/components/list/AddNewRegistryModal';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';

export const EDIT_REGISTRY_MODAL_ID = 'EditRegistryModal';

const EditRegistryModalForm = ({
  isValid, resetForm, values, setValues,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { editData } = useSelector(getInfo);
  const existingRegistries = useSelector(getRegistries);
  const filteredRegistries = useMemo(
    () =>
      existingRegistries.filter(reg => reg.id !== (editData && editData.id)),
    [existingRegistries, editData],
  );

  const names = filteredRegistries.map(reg => reg.name);
  const urls = filteredRegistries.map(reg => reg.url);

  const validateName = value => convertReduxValidationsToFormikValidations(value, [currVal => mustBeUnique(names, currVal, 'name')]);
  const validateUrl = value => convertReduxValidationsToFormikValidations(value, [currVal => mustBeUnique(urls, currVal, 'url'), protocolCompliance]);

  useEffect(() => {
    if (editData) {
      setValues(editData);
    }
  }, [editData, setValues]);

  const handleSave = (newValues) => {
    setLoading(true);
    dispatch(sendPutRegistry(newValues)).then((isSuccess) => {
      setLoading(false);
      resetForm();
      if (isSuccess) {
        dispatch(setVisibleModal(''));
        dispatch(setInfo({}));
      }
    }).catch(() => {
      setLoading(false);
    });
  };

  const handleCancel = () => {
    dispatch(setInfo({}));
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
    <Modal.Title><FormattedMessage id="app.edit" /></Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={EDIT_REGISTRY_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      modalClassName="EditRegistryModal"
      closeLabel="app.cancel"
      modalCloseCleanup={handleCancel}
    >
      <form className="form-horizontal">
        <fieldset className="no-padding">
          <Field
            label={<FormLabel labelId="hub.newRegistry.name" required />}
            component={RenderTextInput}
            name="name"
            type="text"
            validate={validateName}
          />
          <Field
            label={<FormLabel labelId="hub.newRegistry.url" required />}
            component={RenderTextInput}
            name="url"
            type="text"
            validate={validateUrl}
          />
          <Field
            label={<FormLabel labelId="hub.newRegistry.apiKey" />}
            component={RenderTextInput}
            name="apiKey"
            type="text"
          />
        </fieldset>
      </form>
      <Alert type="info">
        <FormattedMessage id="hub.editRegistry.alert" />
      </Alert>
    </GenericModalContainer>
  );
};

EditRegistryModalForm.propTypes = {
  isValid: PropTypes.bool,
  setValues: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    apiKey: PropTypes.string,
  }).isRequired,
};

EditRegistryModalForm.defaultProps = {
  isValid: true,
};

const EditRegistryModal = withFormik({
  enableReinitialize: true,
  validateOnMount: true,
  mapPropsToValues: () => ({
    name: '',
    url: '',
    apiKey: '',
  }),
  validationSchema: () => (
    Yup.object().shape({
      name: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      url: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      apiKey: Yup.string(),
    })),
})(EditRegistryModalForm);

export default EditRegistryModal;
