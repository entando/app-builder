import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import CategoryTreeSelectorContainer from 'ui/categories/common/CategoryTreeSelectorContainer';
import ActiveLanguagesFields from 'ui/common/form/ActiveLanguagesFields';

const maxLength30 = maxLength(30);

const msgs = defineMessages({
  code: {
    id: 'app.code',
    defaultMessage: 'Code',
  },
});

export class CategoryFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      handleSubmit, onSubmit, invalid, submitting, mode, intl,
    } = this.props;

    const isEditMode = mode === 'edit';

    const renderCategoryTree = () => {
      if (!isEditMode) {
        return (
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
        );
      }

      return '';
    };

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="CategoryForm form-horizontal">
        <Row>
          <Col xs={12}>
            <ActiveLanguagesFields {...this.props} />
            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel
                labelId="app.code"
                required
              />}
              placeholder={intl.formatMessage(msgs.code)}
              validate={[required, maxLength30]}
              disabled={isEditMode}
            />
            {renderCategoryTree()}
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
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  onWillMount: PropTypes.func.isRequired,
};

CategoryFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
};

const CategoryForm = reduxForm({
  form: 'category',
})(CategoryFormBody);

export default injectIntl(CategoryForm);
