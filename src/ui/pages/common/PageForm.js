import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { required, code, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { isUndefined } from 'lodash';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import PageTreeSelectorContainer from 'ui/pages/common/PageTreeSelectorContainer';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import SeoInfo from 'ui/pages/common/SeoInfo';
import FindTemplateModalContainer from 'ui/pages/common/FindTemplateModalContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { complementTitlesForActiveLanguages } from 'ui/pages/add/PagesAddFormContainer';
import { NEXT_PAGE_TEMPLATE_CODE } from 'ui/pages/common/const';

const maxLength30 = maxLength(30);
const maxLength70 = maxLength(70);


const msgs = defineMessages({
  chooseAnOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
  chooseOptions: {
    id: 'app.chooseOptions',
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
      intl, handleSubmit, invalid, submitting, groups, allGroups, pageTemplates,
      contentTypes, charsets, mode, onChangeDefaultTitle, parentCode, parentTitle, languages,
      pageCode, seoMode, onFindTemplateClick, appTourProgress, onChangePageTemplate,
      onChangeOwnerGroup, readOnly, stayOnSave, form, editingPageTemplateCode,
    } = this.props;
    let { pages } = this.props;
    if (pages && pages.length > 0) {
      pages = pages.filter(p => p.code !== pageCode);
    }
    const isEditMode = mode === 'edit';
    const isCloneMode = mode === 'clone';

    const pageTemplateDisabled = appTourProgress === APP_TOUR_STARTED ||
    ((isEditMode || isCloneMode) &&
    editingPageTemplateCode === NEXT_PAGE_TEMPLATE_CODE);

    const pageTemplatesWithEmpty =
      [{ code: '', descr: intl.formatMessage(msgs.chooseAnOption) }].concat(pageTemplates);

    const filteredPageTemplates = (isEditMode || isCloneMode) &&
    editingPageTemplateCode !== NEXT_PAGE_TEMPLATE_CODE ?
      pageTemplatesWithEmpty.filter(pT => pT.code !== NEXT_PAGE_TEMPLATE_CODE) :
      pageTemplatesWithEmpty;

    const parentPageComponent = parentCode ?
      <span>{parentTitle}</span> :
      (
        <div className="app-tour-step-8" data-testid="PageForm__PageTreeSelector">
          <Field
            component={PageTreeSelectorContainer}
            name="parentCode"
            pages={pages}
            onPageSelect={pageTemplateDisabled ? () => {} : null}
            validate={[required]}
          />
        </div>
      );

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
                data-testid={`titles.${lang.code}`}
                tourClass="app-tour-step-6"
                label={<FormLabel langLabelText={lang.code} labelId="app.title" required />}
                placeholder={intl.formatMessage(msgTitle.langCode)}
                validate={[required, maxLength70]}
                onChange={(ev) => {
                  if (onChangeDefaultTitle && lang.isDefault) {
                    onChangeDefaultTitle(ev.currentTarget.value);
                  }
                }}
                disabled={readOnly}
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
                component={RenderDropdownTypeaheadInput}
                name="ownerGroup"
                label={<FormLabel labelId="pages.pageForm.ownerGroup" required />}
                options={groups}
                labelKey="name"
                valueKey="code"
                disabled={isEditMode}
                placeholder={intl.formatMessage(msgs.chooseAnOption)}
                tourClass="app-tour-step-9"
                onChange={optionSelected => (
                  onChangeOwnerGroup(optionSelected.code, appTourProgress)
                )}
                validate={[required]}
              />
              <Field
                component={RenderDropdownTypeaheadInput}
                name="joinGroups"
                label={<FormLabel labelId="pages.pageForm.joinGroup" />}
                options={allGroups}
                labelKey="name"
                valueKey="code"
                placeholder={intl.formatMessage(msgs.chooseOptions)}
                multiple
                disabled={readOnly}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormSectionTitle titleId="pages.pageForm.settings" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>
                <Col xs={10}>
                  <Field
                    component={RenderSelectInput}
                    name="pageModel"
                    className="form-control"
                    tourClass="app-tour-step-10"
                    validate={[required]}
                    label={
                      <FormLabel
                        labelId="pages.pageForm.pageTemplate"
                        helpId="pages.pageForm.pageTemplateHelp"
                        required
                      />
                    }
                    onChange={e => onChangePageTemplate(e.target.value, appTourProgress)}
                    options={filteredPageTemplates}
                    optionValue="code"
                    optionDisplayName="descr"
                    disabled={readOnly || pageTemplateDisabled}
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    className="PageForm__find_template"
                    bsStyle="primary"
                    onClick={onFindTemplateClick}
                    disabled={readOnly || pageTemplateDisabled}
                  >
                    <FormattedMessage id="pages.pageForm.findTemplate" />
                  </Button>
                </Col>
              </Row>
              <FindTemplateModalContainer isEditMode={isEditMode} />
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
                    disabled={readOnly}
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
                    disabled={readOnly}
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
                    disabled={readOnly}
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
                    disabled={readOnly}
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

    const onSaveClick = (values, action) => {
      const data = {
        ...values,
        titles: complementTitlesForActiveLanguages(values.titles, languages),
      };
      return this.props.onSubmit(data, action);
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

            {seoMode ? (
              <SeoInfo
                formId={form}
                languages={languages}
                onChangeDefaultTitle={onChangeDefaultTitle}
                readOnly={readOnly}
              />
            ) : (
              renderActiveLanguageTitles()
            )}

            <Field
              component={RenderTextInput}
              name="code"
              data-testid="page-code"
              tourClass="app-tour-step-7"
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

        {seoMode && (
          <Fragment>
            <Row>
              <Col xs={12}>
                <FormSectionTitle titleId="pages.pageForm.seoconfig" />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  component={SwitchRenderer}
                  name="seoData.useExtraDescriptions"
                  label={<FormLabel labelId="pages.pageForm.useExtDescSearch" />}
                  labelSize={3}
                  disabled={readOnly}
                />
              </Col>
            </Row>
          </Fragment>
        )}

        {(!readOnly && !stayOnSave) && (
          <Row>
            <Col xs={12}>
              <div className="btn-toolbar pull-right">
                <Button
                  className="PageForm__save-and-configure-btn app-tour-step-11"
                  type="submit"
                  bsStyle="success"
                  disabled={invalid || submitting}
                  onClick={handleSubmit(values =>
                    onSaveClick(
                      { ...values, appTourProgress },
                      ACTION_SAVE_AND_CONFIGURE,
                  ))}
                >
                  <FormattedMessage id="pages.pageForm.saveAndConfigure" />

                </Button>
                <Button
                  className="PageForm__save-btn"
                  type="submit"
                  data-testid="save-page"
                  bsStyle="primary"
                  disabled={invalid || submitting}
                  onClick={handleSubmit(values =>
                    onSaveClick(values, ACTION_SAVE))}
                >
                  <FormattedMessage id="app.save" />

                </Button>
              </div>
            </Col>
          </Row>
        ) }
      </form>
    );
  }
}

PageFormBody.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
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
  allGroups: PropTypes.arrayOf(PropTypes.shape({
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
  onFindTemplateClick: PropTypes.func,
  parentCode: PropTypes.string,
  parentTitle: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  pageCode: PropTypes.string,
  seoMode: PropTypes.bool,
  appTourProgress: PropTypes.string,
  onChangePageTemplate: PropTypes.func,
  onChangeOwnerGroup: PropTypes.func,
  readOnly: PropTypes.bool,
  stayOnSave: PropTypes.bool,
  editingPageTemplateCode: PropTypes.string,
};

PageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
  onWillMount: null,
  onChangeDefaultTitle: null,
  onFindTemplateClick: null,
  parentCode: null,
  parentTitle: null,
  pages: null,
  pageCode: null,
  seoMode: false,
  appTourProgress: '',
  onChangePageTemplate: () => {},
  onChangeOwnerGroup: () => {},
  readOnly: false,
  stayOnSave: false,
  editingPageTemplateCode: '',
};

const PageForm = reduxForm({
  form: 'page',
  enableReinitialize: true,
})(PageFormBody);

export default injectIntl(PageForm);
