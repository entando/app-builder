import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'patternfly-react';
import { Field, reduxForm, destroy, submit, Form, reset, initialize } from 'redux-form';
import PropTypes from 'prop-types';
import { required } from '@entando/utils';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { getRegistries } from 'state/component-repository/hub/selectors';
import { sendPutRegistry } from 'state/component-repository/hub/actions';
import { setInfo, setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';

export const EDIT_REGISTRY_MODAL_ID = 'EditRegistryModal';

const EditRegistryFormId = 'EditRegistryFormId';

export const mustBeUnique = (values, key) => value => (value && values && values.includes(value) ? <FormattedMessage id={`hub.newRegistry.${key}.error`} /> : undefined);

const EditRegistryModalForm = ({
  invalid, handleSubmit,
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

  const names = useMemo(() => filteredRegistries.map(reg => reg.name), [filteredRegistries]);
  const urls = useMemo(() => filteredRegistries.map(reg => reg.url), [filteredRegistries]);

  const validateName = useMemo(() => [required, mustBeUnique(names, 'name')], [names]);
  const validateUrl = useMemo(() => [required, mustBeUnique(urls, 'url')], [urls]);

  useEffect(() => {
    if (editData) {
      dispatch((initialize(EditRegistryFormId, editData)));
    }
  }, [dispatch, editData]);

  const handleSave = (values) => {
    setLoading(true);
    dispatch(sendPutRegistry(values)).then((isSuccess) => {
      setLoading(false);
      if (isSuccess) {
        dispatch(setVisibleModal(''));
        dispatch(setInfo({}));
        dispatch(destroy(EditRegistryFormId));
      } else {
        reset(EditRegistryFormId);
      }
    }).catch(() => {
      setLoading(false);
    });
  };

  const handleCancel = () => {
    dispatch(setInfo({}));
    dispatch(destroy(EditRegistryFormId));
  };

  const buttons = [
    <Button
      bsStyle="primary"
      type="submit"
      id="InstallationPlanModal__button-ok"
      disabled={invalid || loading}
      onClick={() => dispatch(submit(EditRegistryFormId))}
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
      modalClassName="InstallationPlanModal"
      closeLabel="app.cancel"
      modalCloseCleanup={handleCancel}
    >
      <Form className="form-horizontal" onSubmit={handleSubmit(values => handleSave(values))}>
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
      </Form>
    </GenericModalContainer>
  );
};

EditRegistryModalForm.propTypes = {
  invalid: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

EditRegistryModalForm.defaultProps = {
  invalid: false,
};

const EditRegistryModal = reduxForm({
  form: EditRegistryFormId,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditRegistryModalForm);

export default EditRegistryModal;
