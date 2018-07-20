import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText, required, maxLength, code } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

export const maxLength50 = maxLength(50);
export const maxLength20 = maxLength(20);

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

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
      invalid, submitting, mode, onChangeName, onFocus,
    } = this.props;

    const isEdit = mode === EDIT_MODE;

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
                placeholder={formattedText('group.name')}
                validate={[required, maxLength50]}
                onChange={(ev) => { if (onChangeName) onChangeName(ev.currentTarget.value); }}
              />
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="group.code" helpId="group.code.help" required />}
                placeholder={formattedText('group.code')}
                onFocus={(ev) => { if (onFocus) onFocus(ev.currentTarget.name); }}
                validate={[required, maxLength20, code]}
                disabled={isEdit}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

GroupFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  onChangeName: PropTypes.func,
  onFocus: PropTypes.func,
  onWillMount: PropTypes.func,
};

GroupFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  onChangeName: null,
  onFocus: null,
  onWillMount: () => {},
};

const GroupForm = reduxForm({
  form: 'group',
})(GroupFormBody);

export default GroupForm;
