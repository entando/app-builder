import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { required, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { isUndefined } from 'lodash';
import * as Yup from 'yup';

import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import RenderDropdownTypeaheadInput from 'ui/common/formik-field/RenderDropdownTypeaheadInput';
import PageTreeSelectorContainer from 'ui/pages/common/PageTreeSelectorContainer';
import SwitchRenderer from 'ui/common/formik-field/SwitchInput';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import SeoInfo from 'ui/pages/common/SeoInfo';
import FindTemplateModalContainer from 'ui/pages/common/FindTemplateModalContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { complementTitlesForActiveLanguages } from 'ui/pages/add/PagesAddFormContainer';
import { validateCodeField } from 'helpers/formikValidations';
import { codeWithDash } from 'helpers/attrValidation';

const maxLength30 = maxLength(30);


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

  componentDidUpdate(prevProps) {
    const { myGroups: prevMyGroups, values: prevValues } = prevProps;
    const {
      enableGroupAccessControl, myGroups, redirectToForbidden, values,
    } = this.props;

    if (enableGroupAccessControl) {
      if (myGroups != null && (values || {}).ownerGroup &&
      (prevMyGroups == null || !(prevValues || {}).ownerGroup)) {
        const redirectDueToLackOfGroupAccess = !myGroups.includes((values || {}).ownerGroup);
        if (redirectDueToLackOfGroupAccess) {
          redirectToForbidden();
        }
      }
    }
  }

  render() {
    const {
      intl, isValid, isSubmitting, groups, allGroups, pageTemplates,
      contentTypes, charsets, mode, parentCode, parentTitle, languages,
      pageCode, seoMode, onFindTemplateClick, appTourProgress, onChangePageTemplate,
      onChangeOwnerGroup, readOnly, stayOnSave, values: formikValues,
      setFieldValue, handleSubmit, innerRef,
    } = this.props;
    const { titles } = formikValues || {};
    let { pages } = this.props;
    if (pages && pages.length > 0) {
      pages = pages.filter(p => p.code !== pageCode);
    }
    const isEditMode = mode === 'edit';
    const isCloneMode = mode === 'clone';
    const isAddMode = mode === 'add';

    const defaultLang = languages.find(lang => lang.isDefault) || { code: '' };
    const isDefaultTitleEmpty = !titles || !titles[defaultLang.code] ||
      !titles[defaultLang.code].length;

    const pageTemplateDisabled = appTourProgress === APP_TOUR_STARTED;

    const pageTemplatesWithEmpty =
      [{ code: '', descr: intl.formatMessage(msgs.chooseAnOption) }].concat(pageTemplates);

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
            disabled={readOnly}
          />
        </div>
      );

    const validateTitle = (val) => {
      if (!val || val.length === 0) {
        return <FormattedMessage id="validateForm.required" />;
      }
      if (val.length > 70) {
        return <FormattedMessage id="validateForm.maxLength" values={{ max: 70 }} />;
      }
      return null;
    };

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
                validate={validateTitle}
                onChange={(ev) => {
                  if (lang.isDefault && (isAddMode || isCloneMode)) {
                    setFieldValue('code', ev.currentTarget.value && ev.currentTarget.value.replace(/\W/g, '_').toLowerCase());
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
                    label={
                      <FormLabel
                        labelId="pages.pageForm.pageTemplate"
                        helpId="pages.pageForm.pageTemplateHelp"
                        required
                      />
                    }
                    onChange={e => onChangePageTemplate(e.target.value, appTourProgress)}
                    options={pageTemplatesWithEmpty}
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
              <FindTemplateModalContainer setFieldValue={setFieldValue} isEditMode={isEditMode} />
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

    const onSaveClick = (action) => {
      setFieldValue('saveAction', action);
      handleSubmit();
    };

    return (
      <Form ref={innerRef} className="PageForm form-horizontal">
        <Row>
          <Col xs={12}>
            <FormSectionTitle titleId="pages.pageForm.info" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>

            {seoMode ? (
              <SeoInfo
                languages={languages}
                readOnly={readOnly}
                isAddMode={isAddMode}
                isCloneMode={isCloneMode}
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
              validate={[required, codeWithDash, maxLength30]}
              disabled={isEditMode}
            />

            <FormGroup>
              <label htmlFor="parentCode" className="col-xs-2 control-label">
                <FormLabel labelId="pages.pageForm.pagePlacement" required />
              </label>
              <Col xs={10}>
                {parentPageComponent}
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

        {(!readOnly && !stayOnSave) ? (
          <Row>
            <Col xs={12}>
              <div className="btn-toolbar pull-right">
                <Button
                  className="PageForm__save-and-configure-btn app-tour-step-11"
                  bsStyle="success"
                  disabled={!isValid || isSubmitting || isDefaultTitleEmpty}
                  onClick={() =>
                    onSaveClick(ACTION_SAVE_AND_CONFIGURE)}
                >
                  <FormattedMessage id="pages.pageForm.saveAndConfigure" />

                </Button>
                <Button
                  className="PageForm__save-btn"
                  data-testid="save-page"
                  bsStyle="primary"
                  disabled={!isValid || isSubmitting || isDefaultTitleEmpty}
                  onClick={() =>
                    onSaveClick(ACTION_SAVE)}
                >
                  <FormattedMessage id="app.save" />

                </Button>
              </div>
            </Col>
          </Row>
        ) : null}
      </Form>
    );
  }
}

PageFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  charsets: PropTypes.arrayOf(PropTypes.string),
  contentTypes: PropTypes.arrayOf(PropTypes.string),
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isDefault: PropTypes.bool,
  })).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  allGroups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
  })),
  mode: PropTypes.string,
  onWillMount: PropTypes.func,
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
  enableGroupAccessControl: PropTypes.bool,
  myGroups: PropTypes.arrayOf(PropTypes.string),
  redirectToForbidden: PropTypes.func,
  initialValues: PropTypes.shape({}),
  values: PropTypes.shape({}),
  setFieldValue: PropTypes.func.isRequired,
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
};

PageFormBody.defaultProps = {
  isValid: true,
  isSubmitting: false,
  mode: 'add',
  onWillMount: null,
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
  enableGroupAccessControl: false,
  myGroups: null,
  redirectToForbidden: () => {},
  initialValues: {},
  values: {},
  pageTemplates: [],
  charsets: [],
  contentTypes: [],
  groups: [],
  allGroups: [],
  innerRef: null,
};


const PageForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues, mode }) => ({ ...initialValues, mode, code: (initialValues && initialValues.code) || '' }),
  validationSchema: ({ intl }) => (
    Yup.object().shape({
      code: Yup.string()
        .required(<FormattedMessage id="validateForm.required" />)
        .max(30, <FormattedMessage id="validateForm.maxLength" values={{ max: 30 }} />)
        .test('validateCodeField', validateCodeField(intl)),
      parentCode: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      ownerGroup: Yup.string().when('mode', {
        is: mode => mode === 'add' || mode === 'edit',
        then: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      }),
      pageModel: Yup.string().when('mode', {
        is: mode => mode === 'add' || mode === 'edit',
        then: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      }),
      charset: Yup.string().when('mode', {
        is: mode => mode === 'add' || mode === 'edit',
        then: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      }),
      contentType: Yup.string().when('mode', {
        is: mode => mode === 'add' || mode === 'edit',
        then: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      }),
    })),
  handleSubmit: (
    values,
    formikBag,
  ) => {
    const {
      props: {
        onSubmit, languages, stayOnSave, onSaveSuccess, appTourProgress,
      },
      setSubmitting,
    } = formikBag;
    setSubmitting(true);
    const newValues = {
      ...values,
      titles: complementTitlesForActiveLanguages(values.titles, languages),
      saveAction: undefined,
      mode: undefined,
      appTourProgress,
    };
    onSubmit(newValues, values.saveAction).catch(() => setSubmitting(false)).then(() => {
      if (stayOnSave) {
        setSubmitting(false);
        if (onSaveSuccess) {
          onSaveSuccess(newValues);
        }
      }
    });
  },
  displayName: 'pageForm',
})(PageFormBody);

export default injectIntl(PageForm);
