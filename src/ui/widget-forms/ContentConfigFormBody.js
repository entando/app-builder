import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { withFormik, FieldArray, Field } from 'formik';
import { Button, Row, Col, Alert } from 'patternfly-react';
import { Collapse } from 'react-collapse';
import { isUndefined, get, uniq } from 'lodash';
import { maxLength, required } from '@entando/utils';
import ContentTableRenderer from 'ui/widget-forms/ContentTableRenderer';
import SectionTitle from 'ui/common/SectionTitle';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import NoDefaultWarningModal from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { MULTIPLE_CONTENTS_CONFIG } from 'ui/widget-forms/const';
import WidgetConfigPortal from 'ui/widgets/config/WidgetConfigPortal';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';

const maxLength70 = maxLength(70);

export const MultipleContentsConfigContainerId = `widgets.${MULTIPLE_CONTENTS_CONFIG}`;

export class ContentConfigFormBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      extraOptionsOpen: false,
      publishingSettingsOpen: false,
    };
  }

  componentDidMount() {
    const { onDidMount, cloneMode, setFieldValue } = this.props;
    if (cloneMode) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        extraOptionsOpen: true,
        publishingSettingsOpen: true,
      });
    }
    onDidMount(setFieldValue);
  }

  componentDidUpdate(prevProps) {
    const { values: { contents: prevContents } } = prevProps;
    const {
      values: { contents: chosenContents, chosenContentTypes = [] },
      setFieldValue,
      pushContentTypeDetails,
    } = this.props;
    if (chosenContents !== prevContents) {
      const chosenContentTypeIds = chosenContentTypes.map(({ code }) => code);
      const contentTypesToLoad = uniq(chosenContents.map((content) => {
        const contentId = get(content, 'contentId', get(content, 'id', ''));
        const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
        return get(content, 'typeCode', typeCodeSub);
      })).filter(code => !chosenContentTypeIds.includes(code));
      pushContentTypeDetails(contentTypesToLoad, chosenContentTypes, setFieldValue);
    }
  }

  collapseSection(sectionName) {
    const { [sectionName]: currentVisibility } = this.state;
    this.setState({
      [sectionName]: !currentVisibility,
    });
  }

  normalizeTitles(arr) {
    const { language } = this.props;
    return arr.map((c) => {
      const fullTitle = c.fullTitles[language];
      const title = c.titles[language];
      const countSlashes = (fullTitle.match(/\//g) || []).length;
      return Object.assign(c, { name: `${'.. / '.repeat(countSlashes)}${title}`, level: countSlashes });
    }).sort((a, b) => (a.level > b.level ? 1 : -1));
  }

  renderFormFields() {
    const {
      contentTemplates,
      extFormName,
      putPrefixField,
      isValid,
      isSubmitting,
      languages,
      pages,
      intl,
      widgetCode,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      defaultLanguageCode,
      values,
      submitForm,
    } = this.props;
    const {
      ownerGroup,
      joinGroups,
      contents: chosenContents,
    } = values;
    const { extraOptionsOpen, publishingSettingsOpen } = this.state;
    const multipleContentsMode = widgetCode === MULTIPLE_CONTENTS_CONFIG;
    const normalizedLanguages = languages.map(lang => lang.code);
    const normalizedPages = this.normalizeTitles(pages || []);
    const noContents = chosenContents.length === 0;

    const defaultPageValue = values[putPrefixField('pageLink')];
    const defaultLangLinkTextRequired = defaultPageValue !== null && defaultPageValue !== undefined && defaultPageValue !== '';

    const elementNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 50, 100, 500]
      .map(i => Object.assign({}, { code: i, name: i }));

    const renderTitleFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={putPrefixField(`title_${langCode}`)}
          label={<FormLabel langLabelText={langCode} labelId="app.title" />}
          validate={val => convertReduxValidationsToFormikValidations(val, [maxLength70])}
        />
      )) : null;

    const renderLinkTextFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode =>
        (
          <Field
            key={langCode}
            component={RenderTextInput}
            name={putPrefixField(`linkDescr_${langCode}`)}
            label={(
              <FormLabel
                langLabelText={langCode}
                labelId="widget.form.linkText"
                required={langCode === defaultLanguageCode && defaultLangLinkTextRequired}
              />
          )}
            validate={val => convertReduxValidationsToFormikValidations(
            val,
            langCode === defaultLanguageCode && defaultLangLinkTextRequired
            ? [required, maxLength70] : [maxLength70],
          )}
          />
        )) : null;

    const handleCollapsePublishingSettings = () => this.collapseSection('publishingSettingsOpen');
    const handleCollapseExtraOptions = () => this.collapseSection('extraOptionsOpen');

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const pageIsRequired = !isUndefined(normalizedLanguages)
      ? normalizedLanguages.some((langCode) => {
        const descriptionValue = values[putPrefixField(`linkDescr_${langCode}`)];
        return descriptionValue !== null && descriptionValue !== undefined && descriptionValue !== '';
      }) : false;

    const renderExtraOptions = multipleContentsMode ? (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <SectionTitle
              nameId="widget.form.extraOptions"
              onClick={handleCollapseExtraOptions}
              collapsable
              noRequired
              collapseButtonEnd
              className="SectionTitle__emphasize-caption"
              isOpened={extraOptionsOpen}
            />
            <Collapse isOpened={extraOptionsOpen}>
              <Alert type="info" onDismiss={null}>
                <FormattedMessage id="widget.form.extraOptionsDescription" />
              </Alert>
              <div>
                {renderTitleFields}
                <Field
                  component={RenderSelectInput}
                  name={putPrefixField('pageLink')}
                  label={
                    <FormLabel labelId="widget.form.page" required={!!pageIsRequired} />
            }
                  validate={val =>
                    convertReduxValidationsToFormikValidations(val, pageIsRequired ?
                      [required] : [])}
                  options={normalizedPages}
                  optionValue="code"
                  optionDisplayName="name"
                  defaultOptionId="app.enumerator.none"
                />
                {renderLinkTextFields}
              </div>
            </Collapse>
          </fieldset>
        </Col>
      </Row>
    ) : null;

    const renderPublishingSettings = multipleContentsMode ? (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <SectionTitle
              nameId="widget.form.publishingSettings"
              onClick={handleCollapsePublishingSettings}
              collapsable
              noRequired
              collapseButtonEnd
              className="SectionTitle__emphasize-caption"
              isOpened={publishingSettingsOpen}
            />
            <Collapse isOpened={publishingSettingsOpen}>
              <div>
                <Field
                  component={RenderSelectInput}
                  name={putPrefixField('maxElemForItem')}
                  label={
                    <FormLabel labelId="widget.form.elementsPP" />
                }
                  options={elementNumbers}
                  optionValue="code"
                  optionDisplayName="name"
                  defaultOptionId="user.profile.all"
                />
              </div>
            </Collapse>
          </fieldset>
        </Col>
      </Row>
    ) : null;

    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            <FieldArray
              render={arrayHelpers => (
                <ContentTableRenderer
                  intl={intl}
                  values={values[putPrefixField('contents')]}
                  ownerGroup={ownerGroup}
                  joinGroups={joinGroups}
                  multipleContentsMode={multipleContentsMode}
                  contentTemplates={contentTemplates}
                  arrayHelpers={arrayHelpers}
                  name={putPrefixField('contents')}
                />
              )}
              name={putPrefixField('contents')}
            />
          </Col>
        </Row>
        {renderPublishingSettings}
        {renderExtraOptions}
        {!extFormName && (
          <Row>
            <Col xs={12}>
              <WidgetConfigPortal>
                <Button
                  className="pull-right AddContentTypeFormBody__save--btn"
                  type="submit"
                  bsStyle="primary"
                  disabled={!isValid || isSubmitting || noContents}
                  onClick={() => onSave(submitForm)}
                >
                  <FormattedMessage id="app.save" />
                </Button>
                <Button
                  className="pull-right AddContentTypeFormBody__cancel--btn"
                  bsStyle="default"
                  onClick={handleCancelClick}
                >
                  <FormattedMessage id="cms.label.cancel" />
                </Button>
              </WidgetConfigPortal>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
                invalid={!isValid}
                submitting={isSubmitting}
                onClick={() => onSave(submitForm)}
                onDiscard={onDiscard}
              />
              <NoDefaultWarningModal multipleMode />
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }

  renderWithForm(formContent) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        {formContent}
      </form>
    );
  }

  render() {
    const { extFormName } = this.props;
    const formFields = this.renderFormFields();
    return (
      <Fragment>
        <h5>
          <span className="icon fa fa-puzzle-piece" title="Widget" />
          {' '}
          <FormattedMessage id="widget.multipleContents.config.title" defaultMessage="Content List" />
        </h5>
        {extFormName ? formFields : this.renderWithForm(formFields)}
      </Fragment>
    );
  }
}

ContentConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  language: PropTypes.string.isRequired,
  widgetCode: PropTypes.string.isRequired,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  pushContentTypeDetails: PropTypes.func.isRequired,
  extFormName: PropTypes.string,
  putPrefixField: PropTypes.func,
  cloneMode: PropTypes.bool,
  defaultLanguageCode: PropTypes.string,
  values: PropTypes.shape({
    contents: PropTypes.arrayOf(PropTypes.shape({})),
    chosenContentTypes: PropTypes.arrayOf(PropTypes.shape({})),
    ownerGroup: PropTypes.string,
    joinGroups: PropTypes.arrayOf(PropTypes.string),
  }),
  errors: PropTypes.shape({}),
  submitForm: PropTypes.func,
  setFieldValue: PropTypes.func,
};

ContentConfigFormBody.defaultProps = {
  languages: [],
  pages: [],
  dirty: false,
  extFormName: '',
  isValid: true,
  isSubmitting: false,
  handleSubmit: () => {},
  putPrefixField: name => name,
  cloneMode: false,
  defaultLanguageCode: 'en',
  values: {
    contents: [],
    chosenContentTypes: [],
    ownerGroup: '',
    joinGroups: [],
  },
  errors: {},
  submitForm: () => {},
  setFieldValue: () => {},
};

export default withFormik({
  displayName: MultipleContentsConfigContainerId,
  enableReinitialize: true,
  validateOnChange: true,
  validateOnBlur: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
})(ContentConfigFormBody);
