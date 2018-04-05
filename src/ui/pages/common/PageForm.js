import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';

import { required } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';
import PageTreeSelectorContainer from 'ui/pages/common/PageTreeSelectorContainer';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';


export class PageFormBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  render() {
    const {
      handleSubmit, onSubmit, invalid, submitting, selectedJoinGroups, groups, pageModels,
      contentTypes, charsets, mode, onChangeEnTitle,
    } = this.props;

    const isEditMode = mode === 'edit';

    const pageModelsWithEmpty =
      [{ code: '', descr: formattedText('app.chooseAnOption') }].concat(pageModels);

    const groupsWithEmpty =
      [{ code: '', name: formattedText('app.chooseAnOption') }].concat(groups);

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="PageForm form-horizontal">
        <Row>
          <Col xs={12}>
            <FormSectionTitle titleId="pages.pageForm.info" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="titles.en"
                label={<FormLabel labelId="app.title" langLabelId="app.en" required />}
                placeholder={formattedText('app.enTitle')}
                validate={[required]}
                onChange={(ev) => { if (onChangeEnTitle) onChangeEnTitle(ev.currentTarget.value); }}
              />
            </fieldset>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="titles.it"
                label={<FormLabel labelId="app.title" langLabelId="app.it" required />}
                placeholder={formattedText('app.itTitle')}
                validate={[required]}
              />
            </fieldset>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="app.code" helpId="pages.pageForm.codeHelp" required />}
                placeholder={formattedText('app.code')}
                validate={[required]}
                disabled={isEditMode}
              />
            </fieldset>
            <FormGroup>
              <label htmlFor="parentCode" className="col-xs-2 control-label">
                <FormLabel labelId="pages.pageForm.pagePlacement" required />
              </label>
              <Col xs={10}>
                <Field
                  component={PageTreeSelectorContainer}
                  name="parentCode"
                  validate={[required]}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormSectionTitle titleId="pages.pageForm.pageGroups" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <label htmlFor="ownerGroup" className="col-xs-2 control-label">
                <FormLabel labelId="pages.pageForm.ownerGroup" required />
              </label>
              <Col xs={10}>
                <Field
                  component="select"
                  name="ownerGroup"
                  className="form-control"
                  validate={[required]}
                  disabled={isEditMode}
                >
                  {groupsWithEmpty.map(gr =>
                    <option key={gr.code} value={gr.code}>{gr.name}</option>)}
                </Field>
              </Col>
            </FormGroup>
            <FormGroup>
              <label htmlFor="ownerGroup" className="col-xs-2 control-label">
                <FormLabel labelId="pages.pageForm.joinGroup" required />
              </label>
              <Col xs={10}>
                <FieldArray
                  component={MultiSelectRenderer}
                  name="joinGroups"
                  options={groups}
                  selectedValues={selectedJoinGroups}
                  labelKey="name"
                  valueKey="code"
                  emptyOptionTextId="app.chooseAnOption"
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormSectionTitle titleId="pages.pageForm.settings" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <label htmlFor="pageModel" className="col-xs-2 control-label">
                <FormLabel
                  labelId="pages.pageForm.pageModel"
                  helpId="pages.pageForm.pageModelHelp"
                  required
                />
              </label>
              <Col xs={10}>
                <Field
                  component="select"
                  name="pageModel"
                  className="form-control"
                  validate={[required]}
                >
                  {pageModelsWithEmpty.map(gr =>
                    <option key={gr.code} value={gr.code}>{gr.descr}</option>)}
                </Field>
              </Col>
            </FormGroup>
            <FormGroup>
              <label htmlFor="displayedInMenu" className="col-xs-2 control-label">
                <FormLabel
                  labelId="pages.pageForm.displayedInMenu"
                  helpId="pages.pageForm.displayedInMenuHelp"
                />
              </label>
              <Col xs={4}>
                <Field
                  component={SwitchRenderer}
                  name="displayedInMenu"
                />
              </Col>
              <label htmlFor="seo" className="col-xs-2 control-label">
                <FormLabel
                  labelId="pages.pageForm.seo"
                  helpId="pages.pageForm.seoHelp"
                />
              </label>
              <Col xs={4}>
                <Field
                  component={SwitchRenderer}
                  name="seo"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <label htmlFor="charset" className="col-xs-2 control-label">
                <FormLabel
                  labelId="pages.pageForm.charset"
                  helpId="pages.pageForm.charsetHelp"
                />
              </label>
              <Col xs={2}>
                <Field
                  component="select"
                  name="charset"
                  className="PageForm__charsets-select form-control"
                  size="3"
                  validate={[required]}
                >
                  {charsets.map(type => (
                    <option
                      key={type}
                      className="PageForm__bullet-option"
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </Field>
              </Col>
              <label htmlFor="seo" className="col-xs-2 col-xs-offset-2 control-label">
                <FormLabel
                  labelId="pages.pageForm.mimeType"
                  helpId="pages.pageForm.mimeTypeHelp"
                />
              </label>
              <Col xs={2}>
                <Field
                  component="select"
                  name="contentType"
                  className="PageForm__content-types-select form-control"
                  size="5"
                  validate={[required]}
                >
                  {contentTypes.map(type => (
                    <option
                      key={type}
                      className="PageForm__bullet-option"
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </Field>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="btn-toolbar pull-right">
              <Button
                className="PageForm__save-and-configure-btn"
                type="submit"
                bsStyle="success"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="pages.pageForm.saveAndConfigure" />
              </Button>
              <Button
                className="PageForm__save-btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

PageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  charsets: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  pageModels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
  })).isRequired,
  mode: PropTypes.string,
  onWillMount: PropTypes.func,
  onChangeEnTitle: PropTypes.func,
};

PageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
  onWillMount: null,
  onChangeEnTitle: null,
};

const PageForm = reduxForm({
  form: 'page',
})(PageFormBody);

export default PageForm;
