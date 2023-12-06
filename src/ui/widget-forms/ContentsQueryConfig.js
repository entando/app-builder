import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/router';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field, FieldArray, withFormik, getIn } from 'formik';
import { Collapse } from 'react-collapse';
import { Button, Row, Col, FormGroup, Alert } from 'patternfly-react';
import { routeConverter, required, maxLength } from '@entando/utils';
import { isUndefined } from 'lodash';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import SectionTitle from 'ui/common/SectionTitle';
import MultiFilterSelectRenderer from 'ui/common/formik-field/MultiFilterSelectRenderer';
import FiltersSelectRenderer from 'ui/common/formik-field/FiltersSelectRenderer';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import NoDefaultWarningModal from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { CONTENTS_QUERY_CONFIG } from 'ui/widget-forms/const';
import WidgetConfigPortal from 'ui/widgets/config/WidgetConfigPortal';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';

export const ContentsQueryContainerId = `widgets.${CONTENTS_QUERY_CONFIG}`;

const maxLength70 = maxLength(70);
const CATEGORY_HOME = 'home';

const elementNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20]
  .map(i => Object.assign({}, { code: i, name: i }));

export class ContentsQueryFormBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publishingSettings: false,
      filters: false,
      extraOptions: false,
      frontendFilters: false,
    };
  }

  componentDidMount() {
    const { cloneMode, onDidMount } = this.props;
    if (cloneMode) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        publishingSettings: true,
        filters: true,
        extraOptions: true,
        frontendFilters: true,
      });
    }
    onDidMount();
  }

  componentDidUpdate(prevProps) {
    const { values: prevValues } = prevProps;
    const {
      onChangeContentType, values: currentValues, setFieldValue, putPrefixField,
      contentType, initialValues, setSelectedContentType, contentTypes,
    } = this.props;
    if (initialValues.contentType !== '' && !contentType.code) {
      const selectedContentTypeFromForm = contentTypes
        .find(ctype => ctype.code === initialValues.contentType);
      if (selectedContentTypeFromForm) setSelectedContentType(selectedContentTypeFromForm);
    }
    if (getIn(prevValues, putPrefixField('contentType')) !== getIn(currentValues, putPrefixField('contentType'))) {
      onChangeContentType(getIn(currentValues, putPrefixField('contentType')), setFieldValue);
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
    });
  }

  renderFormFields() {
    const {
      contentTypes, contentType, contentTemplates, categories, pages,
      onResetModelId,
      intl, onChangeFilterValue, onResetFilterOption, onChangeFilterAttribute,
      languages, onToggleInclusiveOr, extFormName,
      isValid, isDirty, isSubmitting, onCancel, onDiscard, putPrefixField,
      widgetConfigFormData, defaultLanguageCode, values, setFieldValue, handleSubmit,
      onSave, submitForm,
    } = this.props;
    const {
      publishingSettings, filters: filtersPanel,
      extraOptions, frontendFilters: frontendFiltersPanel,
    } = this.state;

    const normalizedCategories = this.normalizeTitles(categories.filter(c => (
      c.code !== CATEGORY_HOME
    )));
    const normalizedPages = this.normalizeTitles(pages || []);

    const normalizedLanguages = languages.map(lang => lang.code);

    const defaultPageValue = getIn(values, putPrefixField('pageLink'));
    const defaultLangLinkTextRequired = defaultPageValue !== null && defaultPageValue !== undefined && defaultPageValue !== '';

    const renderTitleFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={putPrefixField(`title_${langCode}`)}
          label={<FormLabel langLabelText={langCode} labelId="app.title" />}
          validate={value => convertReduxValidationsToFormikValidations(value, [maxLength70])}
        />
      )) : null;

    const renderLinkTextFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
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
          validate={value =>
            convertReduxValidationsToFormikValidations(
              value,
              langCode === defaultLanguageCode
              && defaultLangLinkTextRequired
              ? [required, maxLength70] : [maxLength70],
            )
          }
        />
      )) : null;

    const pageIsRequired = !isUndefined(normalizedLanguages)
      ? normalizedLanguages.some((langCode) => {
        const descriptionValue = widgetConfigFormData[putPrefixField(`linkDescr_${langCode}`)];
        return descriptionValue !== null && descriptionValue !== undefined && descriptionValue !== '';
      }) : false;

    const inclusiveOrOptions = [{ id: 'true', label: intl.formatMessage({ id: 'widget.form.inclusiveOr' }) }];

    const renderCategories = getIn(values, putPrefixField('categories'));

    const getListAttributeFilters = () => {
      if (!contentType.attributes) {
        return [];
      }
      const attributeFilters = contentType.attributes.filter(attribute => attribute.listFilter);
      return attributeFilters.map(({ code, type }) => ({
        code,
        name: `Attribute: ${code}`,
        type,
      }));
    };

    const ButtonComponent = () => (
      <Button
        bsStyle="default"
        type="button"
        disabled={
          !!getIn(values, putPrefixField('categories'))
          && (getIn(values, putPrefixField('categories')).length < 2
          && getIn(values, putPrefixField('categories')).length !== 0)
        }
        active={Boolean(getIn(values, putPrefixField('orClauseCategoryFilter')))}
        onClick={() => onToggleInclusiveOr(getIn(values, putPrefixField('orClauseCategoryFilter')), setFieldValue)}
        className={`ContentsQueryForm__inclusiveOr
    ${getIn(values, putPrefixField('orClauseCategoryFilter')) ? 'ContentsQueryForm__inclusiveOr--active' : ''}`}
      >
        <FormattedMessage
          id="widget.form.inclusiveOr"
          defaultMessage="Use inclusive filter (OR)"
        />
      </Button>
    );

    const renderSaveButton = getIn(values, putPrefixField('contentType'))
      && (
      <Button
        className="pull-right AddContentTypeFormBody__save--btn"
        type="submit"
        bsStyle="primary"
        disabled={!isValid || isSubmitting}
        onClick={() => { onSave(submitForm); handleSubmit(); }}
      >
        <FormattedMessage id="app.save" />
      </Button>
      );

    const attributeFilters = getListAttributeFilters();

    const filters = [
      { code: '', nameId: 'widget.form.selectFilter' },
      { code: 'created', nameId: 'widget.form.creationDate' },
      { code: 'modified', nameId: 'widget.form.lastModify' },
      ...attributeFilters,
    ];

    const frontendFilters = [
      { code: '', nameId: 'widget.form.selectFilter' },
      { code: 'fulltext', nameId: 'widget.form.text' },
      { code: 'category', nameId: 'menu.categories' },
      ...attributeFilters,
    ];

    const allCategories = [{
      code: 'all',
      nameId: 'user.profile.all',
      name: intl.formatMessage({ id: 'user.profile.all' }),
    }, ...normalizedCategories];

    const frontendFiltersSuboptions = {
      fulltext: [],
      category: allCategories,
      ...attributeFilters.map(({ code }) => ({ [code]: [] })),
    };

    const handleContentTypeChange = () => onResetModelId(setFieldValue);
    const handleCollapsePublishingSettings = () => this.collapseSection('publishingSettings');
    const handleCollapseFilters = () => this.collapseSection('filters');
    const handleCollapseExtraOptions = () => this.collapseSection('extraOptions');
    const handleCollapseFrontendFilters = () => this.collapseSection('frontendFilters');
    const handleCancelClick = () => {
      if (isDirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <SectionTitle
                nameId="app.info"
                noRequired
              />
              <Field
                name={putPrefixField('contentType')}
                label={
                  <FormLabel labelId="dataModel.type" />
                }
                options={contentTypes}
                optionValue="code"
                optionDisplayName="name"
                defaultOptionId="app.enumerator.none"
                component={RenderSelectInput}
                onChange={() => {
                  handleContentTypeChange();
                }}
              />
            </fieldset>
          </Col>
        </Row>
        <div className={getIn(values, putPrefixField('contentType')) ? 'visible' : 'hidden'}>
          <Row className="InfoFormBody">
            <Col xs={12}>
              <fieldset className="no-padding">
                <SectionTitle
                  nameId="widget.form.publishingSettings"
                  onClick={handleCollapsePublishingSettings}
                  collapsable
                  noRequired
                  collapseButtonEnd
                  className="SectionTitle__emphasize-caption"
                  isOpened={publishingSettings}
                />
                <Collapse isOpened={publishingSettings}>
                  <div>
                    <Field
                      component={RenderSelectInput}
                      name={putPrefixField('modelId')}
                      label={
                        <FormLabel labelId="widget.form.contentTemplate" />
                    }
                      options={contentTemplates}
                      optionValue="id"
                      optionDisplayName="descr"
                      defaultOptionId="widget.form.default"
                    />
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
                    <Field
                      component={RenderSelectInput}
                      name={putPrefixField('maxElements')}
                      label={
                        <FormLabel labelId="widget.form.maxElements" />
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
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <SectionTitle
                  nameId="widget.form.filters"
                  onClick={handleCollapseFilters}
                  collapsable
                  collapseButtonEnd
                  noRequired
                  className="SectionTitle__emphasize-caption"
                  isOpened={filtersPanel}
                />
                <Collapse isOpened={filtersPanel}>
                  <FormGroup>
                    <label htmlFor="categories" className="col-xs-2 control-label">
                      <FormLabel labelId="menu.categories" />
                    </label>
                    <Col xs={12} sm={10}>
                      <FieldArray
                        name={putPrefixField('categories')}
                        render={formik => (<MultiFilterSelectRenderer
                          {...formik}
                          options={allCategories}
                          selectedValues={renderCategories}
                          labelKey="name"
                          valueKey="code"
                          allMode
                        />)}

                      />
                      <div className="ContentsQueryForm__inclusiveOr">
                        <Field
                          component={ButtonComponent}
                          toggleElement={inclusiveOrOptions}
                          name={putPrefixField('orClauseCategoryFilter')}
                        />
                        <span className="help-block">
                          <FormattedMessage id="widget.form.inclusiveOrTip" />
                        </span>
                      </div>

                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="categories" className="col-xs-2 control-label">
                      <FormLabel labelId="app.filter" />
                    </label>
                    <Col xs={12} sm={10}>
                      <FieldArray
                        name={putPrefixField('filters')}
                        render={formik => (<FiltersSelectRenderer
                          {...formik}
                          intl={intl}
                          options={filters}
                          onResetFilterOption={
                            (name, i, value) => onResetFilterOption(name, i, value, setFieldValue)
                          }
                          onChangeFilterValue={
                            (name, index, value) =>
                             onChangeFilterValue(name, index, value, setFieldValue)
                          }
                          onChangeFilterAttribute={
                            (name, index, attributeFilter) =>
                             onChangeFilterAttribute(name, index, attributeFilter, setFieldValue)
                          }
                          filterName={putPrefixField('filters')}
                          attributeFilterChoices={attributeFilters}
                        />)}
                      />
                    </Col>
                  </FormGroup>
                </Collapse>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <SectionTitle
                  nameId="widget.form.extraOptions"
                  onClick={handleCollapseExtraOptions}
                  collapsable
                  collapseButtonEnd
                  noRequired
                  className="SectionTitle__emphasize-caption"
                  isOpened={extraOptions}
                />
                <Collapse isOpened={extraOptions}>
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
                      validate={value =>
                        convertReduxValidationsToFormikValidations(
                          value,
                          pageIsRequired ? [required] : [],
                          )
                      }
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
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <SectionTitle
                  nameId="widget.form.frontendFilters"
                  onClick={handleCollapseFrontendFilters}
                  collapsable
                  collapseButtonEnd
                  noRequired
                  className="SectionTitle__emphasize-caption"
                  isOpened={frontendFiltersPanel}
                />
                <Collapse isOpened={frontendFiltersPanel}>
                  <FormGroup className="clearfix">
                    <label htmlFor="categories" className="col-xs-2 control-label">
                      <FormLabel labelId="app.filter" />
                    </label>
                    <Col xs={12} sm={10}>
                      <FieldArray
                        name={putPrefixField('userFilters')}
                        render={formik => (<FiltersSelectRenderer
                          {...formik}
                          intl={intl}
                          options={frontendFilters}
                          suboptions={frontendFiltersSuboptions}
                          onResetFilterOption={
                            (name, i, value) => onResetFilterOption(name, i, value, setFieldValue)
                          }
                          onChangeFilterValue={
                            (name, index, value) =>
                             onChangeFilterValue(name, index, value, setFieldValue)
                          }
                          onChangeFilterAttribute={
                            (name, index, attributeFilter) =>
                             onChangeFilterAttribute(name, index, attributeFilter, setFieldValue)
                          }
                          filterName={putPrefixField('userFilters')}
                          attributeFilterChoices={attributeFilters}
                        />)}

                      />
                    </Col>
                  </FormGroup>
                </Collapse>
              </fieldset>
            </Col>
          </Row>
        </div>
        <br />
        {!extFormName && (
          <Row>
            <Col xs={12}>
              <WidgetConfigPortal>
                {renderSaveButton}
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
                submitting={isSubmitting}
                invalid={!isValid}
                onClick={() => { onSave(submitForm); handleSubmit(); }}
                onDiscard={onDiscard}
              />
            </Col>
          </Row>
        )}
        <NoDefaultWarningModal />
      </Fragment>
    );
  }

  renderWithForm(formContent) {
    const { handleSubmit } = this.props;
    const onSubmit = (ev) => {
      ev.preventDefault();
      handleSubmit();
    };
    return (
      <form onSubmit={onSubmit} className="form-horizontal ContentsQueryForm">
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
          <FormattedMessage id="widget.contentsQuery.config.title" defaultMessage="Content Search Query" />
        </h5>
        {extFormName ? formFields : this.renderWithForm(formFields)}
      </Fragment>
    );
  }
}

ContentsQueryFormBody.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  setSelectedContentType: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
  contentType: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
    code: PropTypes.string,
  }),
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onResetFilterOption: PropTypes.func.isRequired,
  onChangeFilterValue: PropTypes.func.isRequired,
  onChangeFilterAttribute: PropTypes.func.isRequired,
  onChangeContentType: PropTypes.func.isRequired,
  onToggleInclusiveOr: PropTypes.func.isRequired,
  onResetModelId: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isDirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  extFormName: PropTypes.string,
  putPrefixField: PropTypes.func,
  cloneMode: PropTypes.bool,
  widgetConfigFormData: PropTypes.shape({}),
  defaultLanguageCode: PropTypes.string,
  values: PropTypes.shape({
    contentType: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    orClauseCategoryFilter: PropTypes.string,
  }),
  initialValues: PropTypes.shape({
    contentType: PropTypes.string,
  }).isRequired,
};

ContentsQueryFormBody.defaultProps = {
  isValid: false,
  isDirty: false,
  isSubmitting: false,
  languages: [],
  contentTypes: [],
  contentType: {},
  contentTemplates: [],
  categories: [],
  pages: [],
  selectedCategories: [],
  extFormName: '',
  putPrefixField: name => name,
  cloneMode: false,
  widgetConfigFormData: {},
  defaultLanguageCode: 'en',
  values: {
    contentType: '',
    categories: [],
    orClauseCategoryFilter: '',
  },
};

const ContentsQueryConfig = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues, languages, parentField }) => {
    let formValues = {
      ...initialValues,
      ...languages.reduce((acc, item) => ({
        ...acc,
        [`title_${item.code}`]: initialValues[`title_${item.code}`] || '',
        [`linkDescr_${item.code}`]: initialValues[`linkDescr_${item.code}`] || '',
      }), {}),
    };
    if (parentField) {
      formValues = {
        [parentField]: formValues,
      };
    }

    return formValues;
  },
  handleSubmit(values, {
    setSubmitting,
    props: {
      onSubmit, history, intl, continueWithDispatch, pageCode,
    },
  }) {
    onSubmit(values)
      .then((res) => {
        if (res) {
          continueWithDispatch(addToast(
            intl.formatMessage({ id: 'widget.update.success' }),
            TOAST_SUCCESS,
          ));
          history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
        }
      })
      .finally(() => setSubmitting(false));
  },
})(ContentsQueryFormBody);

export default ContentsQueryConfig;
