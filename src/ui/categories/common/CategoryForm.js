import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';

import { required } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import CategoryTreeSelectorContainer from 'ui/categories/common/CategoryTreeSelectorContainer';

export class CategoryFormBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  render() {
    const {
      handleSubmit, onSubmit, invalid, submitting, mode, onChangeEnTitle,
    } = this.props;

    const isEditMode = mode === 'edit';

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="CategoryForm form-horizontal">
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="titles.en"
              label={<FormLabel labelId="app.title" langLabelId="app.en" required />}
              placeholder={formattedText('app.enTitle')}
              validate={[required]}
              onChange={(ev) => { if (onChangeEnTitle) onChangeEnTitle(ev.currentTarget.value); }}
            />
            <Field
              component={RenderTextInput}
              name="titles.it"
              label={<FormLabel labelId="app.title" langLabelId="app.it" required />}
              placeholder={formattedText('app.itTitle')}
              validate={[required]}
            />
            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel
                labelId="app.code"
                required
              />}
              placeholder={formattedText('app.code')}
              validate={[required]}
              disabled={isEditMode}
            />
            <FormGroup>
              <label htmlFor="parentCode" className="col-xs-2 control-label">
                <FormLabel labelId="category.categoryForm.categoryPlacement" required />
              </label>
              <Col xs={10}>
                <Field
                  component={CategoryTreeSelectorContainer}
                  name="parentCode"
                  validate={[required]}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="CategoryForm__save-btn pull-right"
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

CategoryFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  onWillMount: PropTypes.func,
  onChangeEnTitle: PropTypes.func,
};

CategoryFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
  onWillMount: null,
  onChangeEnTitle: null,
};

const CategoryForm = reduxForm({
  form: 'category',
})(CategoryFormBody);

export default CategoryForm;
