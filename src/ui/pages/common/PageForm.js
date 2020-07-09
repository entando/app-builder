import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { required, code, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { isUndefined } from 'lodash';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';
import PageTreeSelectorContainer from 'ui/pages/common/PageTreeSelectorContainer';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import SeoInfo from 'ui/pages/common/SeoInfo';

const seoEnabled = true;

const maxLength30 = maxLength(30);
const maxLength70 = maxLength(70);


const msgs = defineMessages({
  chooseAnOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
  appCode: {
    id: 'app.code',
    defaultMessage: 'Code',
  },
});

export class PageFormBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  render() {
    const {
      intl, handleSubmit, invalid, submitting, selectedJoinGroups, groups, pageTemplates,
      contentTypes, charsets, mode, onChangeDefaultTitle, parentCode, parentTitle, languages,
      pageCode,
    } = this.props;
    let { pages } = this.props;
    if (pages && pages.length > 0) {
      pages = pages.filter(p => p.code !== pageCode);
    }
    const isEditMode = mode === 'edit';
    const isCloneMode = mode === 'clone';

    const pageTemplatesWithEmpty =
      [{ code: '', descr: intl.formatMessage(msgs.chooseAnOption) }].concat(pageTemplates);

    const groupsWithEmpty =
      [{ code: '', name: intl.formatMessage(msgs.chooseAnOption) }].concat(groups);

    const parentPageComponent = parentCode ?
      <span>{parentTitle}</span> :
      (<Field
        component={PageTreeSelectorContainer}
        name="parentCode"
        pages={pages}
        validate={[required]}
      />);

    const renderActiveLanguageTitles = () => {
      if (!isUndefined(languages)) {
        return languages
          .map((lang) => {
            const msgTitle = defineMessages({
              langCode: { id: `app.${lang.code}Title` },
            });
            return (
              <Field
                key={lang.code}
                component={RenderTextInput}
                name={`titles.${lang.code}`}
                label={<FormLabel langLabelText={lang.code} labelId="app.title" required />}
                placeholder={intl.formatMessage(msgTitle.langCode)}
                validate={[required, maxLength70]}
                onChange={(ev) => {
                  if (onChangeDefaultTitle && lang.isDefault) {
                    onChangeDefaultTitle(ev.currentTarget.value);
                  }
                }}
              />
            );
          });
      }
      return null;
    };

    const renderFullForm = () => {
      if (isCloneMode) {
        return null;
      }

      return (
        <div>
          <Row>
            <Col xs={12}>
              <FormSectionTitle titleId="pages.pageForm.pageGroups" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                component={RenderSelectInput}
                name="ownerGroup"
                className="form-control"
                validate={[required]}
                disabled={isEditMode}
                label={<FormLabel labelId="pages.pageForm.ownerGroup" required />}
                options={groupsWithEmpty}
                optionValue="code"
                optionDisplayName="name"
              />
              <FormGroup>
                <label htmlFor="ownerGroup" className="col-xs-2 control-label">
                  <FormLabel labelId="pages.pageForm.joinGroup" />
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
              <Field
                component={RenderSelectInput}
                name="pageModel"
                className="form-control"
                validate={[required]}
                label={
                  <FormLabel
                    labelId="pages.pageForm.pageTemplate"
                    helpId="pages.pageForm.pageTemplateHelp"
                    required
                  />
                }
                options={pageTemplatesWithEmpty}
                optionValue="code"
                optionDisplayName="descr"
              />
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
        </div>
      );
    };

    return (
      <form className="PageForm form-horizontal">
        <Row>
          <Col xs={12}>
            <FormSectionTitle titleId="pages.pageForm.info" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>

            {seoEnabled ? (<SeoInfo languages={languages} />) : renderActiveLanguageTitles()}

            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel labelId="app.code" helpId="pages.pageForm.codeHelp" required />}
              placeholder={intl.formatMessage(msgs.appCode)}
              validate={[required, code, maxLength30]}
              disabled={isEditMode}
            />

            <FormGroup>
              <label htmlFor="parentCode" className="col-xs-2 control-label">
                <FormLabel labelId="pages.pageForm.pagePlacement" required />
              </label>
              <Col xs={10}>
                { parentPageComponent }
              </Col>
            </FormGroup>

          </Col>
        </Row>

        {renderFullForm()}

        <Row>
          <Col xs={12}>
            <div className="btn-toolbar pull-right">

              <Button
                className="PageForm__save-and-configure-btn"
                type="submit"
                bsStyle="success"
                disabled={invalid || submitting}
                onClick={handleSubmit(values =>
                  this.props.onSubmit(values, ACTION_SAVE_AND_CONFIGURE))}
              >
                <FormattedMessage id="pages.pageForm.saveAndConfigure" />

              </Button>
              <Button
                className="PageForm__save-btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
                onClick={handleSubmit(values =>
                  this.props.onSubmit(values, ACTION_SAVE))}
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
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  charsets: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isDefault: PropTypes.bool,
  })).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
  })).isRequired,
  mode: PropTypes.string,
  onWillMount: PropTypes.func,
  onChangeDefaultTitle: PropTypes.func,
  parentCode: PropTypes.string,
  parentTitle: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  pageCode: PropTypes.string,
};

PageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
  onWillMount: null,
  onChangeDefaultTitle: null,
  parentCode: null,
  parentTitle: null,
  pages: null,
  pageCode: null,
};

const PageForm = reduxForm({
  form: 'page',
})(PageFormBody);

export default injectIntl(PageForm);
