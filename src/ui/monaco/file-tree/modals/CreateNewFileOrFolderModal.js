import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Spinner } from 'patternfly-react';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import FormLabel from 'ui/common/form/FormLabel';
import { required, maxLength } from '@entando/utils';

const maxLength70 = maxLength(70);

export const MODAL_ID = 'CreateNewFileOrFolderModal';

const CreateNewFileOrFolderModal = (props) => {
  const {
    onConfirmCreate, info, invalid, loading,
  } = props;
  const [name, setName] = useState('');
  const onCreate = () => {
    onConfirmCreate(`${info.path}/${name}`);
  };

  const buttons = [
    <Button bsStyle="success" id="PublishPageModal__button-publish" onClick={onCreate} disabled={invalid}>
      <FormattedMessage id="app.create" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.create" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="PublishPageModal">
      <Spinner loading={!!loading}>
        <Field
          key="name"
          component={RenderTextInput}
          name="name"
          label={<FormLabel helpId={`modal.confirm.create.${info.isDirectory ? 'folder' : 'file'}`} labelId="app.name" required />}
          validate={[required, maxLength70]}
          inputSize={9}
          labelSize={3}
          onChange={(ev) => {
                    setName(ev.currentTarget.value);
                  }}
        />
      </Spinner>
    </GenericModalContainer>
  );
};

CreateNewFileOrFolderModal.propTypes = {
  onConfirmCreate: PropTypes.func.isRequired,
  info: PropTypes.shape({
    path: PropTypes.string,
    isDirectory: PropTypes.bool,
  }),
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
};

CreateNewFileOrFolderModal.defaultProps = {
  info: {
    path: '',
    isDirectory: false,
  },
  invalid: false,
  loading: false,
};


export default reduxForm({
  form: 'CreateNewFileOrFolderForm',
})(CreateNewFileOrFolderModal);
