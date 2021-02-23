import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { required, maxLength, code } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

export const maxLength50 = maxLength(50);
export const maxLength20 = maxLength(20);

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const msgs = defineMessages({
  groupName: {
    id: 'group.name',
    defaultMessage: 'Group Name',
  },
  groupCode: {
    id: 'group.code',
    defaultMessage: 'Group Code',
  },
});

export class GroupFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      intl, invalid, submitting, mode, onChangeName, onFocus,
      dirty, onCancel, onDiscard, onSave,
    } = this.props;

    const isEdit = mode === EDIT_MODE;

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <form onSubmit={this.onSubmit} className="GroupForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="GroupForm__required-fields text-right">
                * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="name"
                label={<FormLabel labelId="group.name" helpId="group.name.help" required />}
                placeholder={intl.formatMessage(msgs.groupName)}
                validate={[required, maxLength50]}
                onChange={(ev) => { if (onChangeName) onChangeName(ev.currentTarget.value); }}
              />
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="group.code" helpId="group.code.help" required />}
                placeholder={intl.formatMessage(msgs.groupCode)}
                onFocus={(ev) => { if (onFocus) onFocus(ev.currentTarget.name); }}
                validate={[required, maxLength20, code]}
                disabled={isEdit}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ConfirmCancelModalContainer
              contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
              invalid={invalid}
              submitting={submitting}
              onSave={onSave}
              onDiscard={onDiscard}
            />
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right UserForm__action-button"
              bsStyle="default"
              onClick={handleCancelClick}
            >
              <FormattedMessage id="app.cancel" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

GroupFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  onChangeName: PropTypes.func,
  onFocus: PropTypes.func,
  onWillMount: PropTypes.func,
  dirty: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

GroupFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  onChangeName: null,
  onFocus: null,
  onWillMount: () => {},
  dirty: false,
};

const GroupForm = reduxForm({
  form: 'group',
})(GroupFormBody);

export default injectIntl(GroupForm);
