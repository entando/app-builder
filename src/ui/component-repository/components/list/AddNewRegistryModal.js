import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'patternfly-react';
import { Field, reduxForm, destroy } from 'redux-form';
import PropTypes from 'prop-types';
import { required } from '@entando/utils';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { getRegistries } from 'state/component-repository/hub/selectors';
import { sendAddRegistry } from 'state/component-repository/hub/actions';
import { setVisibleModal } from 'state/modal/actions';

export const ADD_NEW_REGISTRY_MODAL_ID = 'AddNewRegistryModal';

const NewRegistryFormId = 'NewRegistryFormId';

export const isUnique = (values, key) => value => (value && values && values.includes(value) ? <FormattedMessage id={`hub.newRegistry.${key}.error`} /> : undefined);

const AddNewRegistryModalForm = ({
  invalid,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const existingRegistries = useSelector(getRegistries);

  const names = useMemo(() => existingRegistries.map(reg => reg.name), [existingRegistries]);
  const urls = useMemo(() => existingRegistries.map(reg => reg.url), [existingRegistries]);

  const validateName = useMemo(() => [required, isUnique(names, 'name')], [names]);
  const validateUrl = useMemo(() => [required, isUnique(urls, 'url')], [urls]);

  const handleSave = (values) => {
    setLoading(true);
    dispatch(sendAddRegistry(values)).then(() => {
      dispatch(setVisibleModal(''));
      dispatch(destroy(NewRegistryFormId));
    }).catch(() => {
      setLoading(false);
    });
  };

  const buttons = [
    <Button bsStyle="primary" id="InstallationPlanModal__button-ok" disabled={invalid || loading} onClick={handleSave}>
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
        </fieldset>
      </form>
    </GenericModalContainer>
  );
};

AddNewRegistryModalForm.propTypes = {
  invalid: PropTypes.bool,
};

AddNewRegistryModalForm.defaultProps = {
  invalid: false,
};

const AddNewRegistryModal = reduxForm({
  form: NewRegistryFormId,
})(AddNewRegistryModalForm);

export default AddNewRegistryModal;
