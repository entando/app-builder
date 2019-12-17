import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Collapse } from 'react-collapse';
import { Button, Row, Col, FormGroup, Alert } from 'patternfly-react';
import { maxLength } from '@entando/utils';
import { isUndefined } from 'lodash';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';
import FiltersSelectRenderer from 'ui/pages/common/FiltersSelectRenderer';

const maxLength70 = maxLength(70);
const CATEGORY_HOME = 'home';

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
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentDidUpdate(prevProps) {
    const { selectedContentType: prevContentType } = prevProps;
    const { selectedContentType, onChangeContentType } = this.props;
    if (selectedContentType !== prevContentType) {
      onChangeContentType(selectedContentType);
    }
  }


  collapseSection(sectionName) {
    const currentVisibility = this.state[sectionName];
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

  render() {
    const onSubmit = (ev) => {
      ev.preventDefault();
      this.props.handleSubmit();
    };

    const {
      contentTypes, contentModels, categories, pages,
      onChangeContentType, selectedContentType, selectedCategories,
      intl, onResetFilterOption, languages, onToggleInclusiveOr,
      selectedInclusiveOr,
    } = this.props;
    const elementNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20]
      .map(i => Object.assign({}, { code: i, name: i }));
    const normalizedCategories =
      this.normalizeTitles(categories.filter(c => c.code !== CATEGORY_HOME));
    const normalizedPages = this.normalizeTitles(pages || []);

    const normalizedLanguages = languages.map(lang => lang.code);

    const renderTitleFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={`title_${langCode}`}
          label={<FormLabel langLabelText={langCode} labelId="app.title" />}
          validate={[maxLength70]}
        />
      )) : null;

    const renderLinkTextFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={`linkDescr_${langCode}`}
          label={<FormLabel langLabelText={langCode} labelId="widget.form.linkText" />}
          validate={[maxLength70]}
        />
      )) : null;

    const inclusiveOrOptions = [{ id: 'true', label: intl.formatMessage({ id: 'widget.form.inclusiveOr' }) }];

    const renderCategories = selectedCategories;

    const ButtonComponent = () => (
      <Button
        bsStyle="default"
        type="button"
        disabled={selectedCategories.length < 2 && selectedCategories.length !== 0}
        active={Boolean(selectedInclusiveOr)}
        onClick={() => onToggleInclusiveOr(selectedInclusiveOr)}
        className={`ContentsQueryForm__inclusiveOr
    ${selectedInclusiveOr ? 'ContentsQueryForm__inclusiveOr--active' : ''}`}
      >
        <FormattedMessage
          id="widget.form.inclusiveOr"
          defaultMessage="Use inclusive filter (OR)"
        />
      </Button>);

    const renderSaveButton = selectedContentType &&
      <Button
        className="pull-right"
        type="submit"
        bsStyle="primary"
        disabled={this.props.invalid || this.props.submitting}
      >
        <FormattedMessage id="app.save" />
      </Button>;


    const orderFilters = [
      {
        code: '',
        nameId: 'app.enumerator.none',
      },
      {
        code: 'ASC',
        nameId: 'widget.form.asc',
      },
      {
        code: 'DESC',
        nameId: 'widget.form.desc',
      },
    ];

    const filters = [
      { code: '', nameId: 'widget.form.selectFilter' },
      { code: 'created', nameId: 'widget.form.creationDate' },
      { code: 'modified', nameId: 'widget.form.lastModify' },
    ];

    const filtersSuboptions = {
      created: orderFilters,
      modified: orderFilters,
    };

    const frontendFilters = [
      { code: '', nameId: 'widget.form.selectFilter' },
      { code: 'fulltext', nameId: 'widget.form.text' },
      { code: 'category', nameId: 'menu.categories' },
    ];

    const allCategories = [{
      code: 'all',
      nameId: 'user.profile.all',
      name: intl.formatMessage({ id: 'user.profile.all' }),
    }, ...normalizedCategories];

    const frontendFiltersSuboptions = {
      fulltext: [],
      category: allCategories,
    };

    const handleContentTypeChange = ev => onChangeContentType(ev.currentTarget.value);
    const handleCollapsePublishingSettings = () => this.collapseSection('publishingSettings');
    const handleCollapseFilters = () => this.collapseSection('filters');
    const handleCollapseExtraOptions = () => this.collapseSection('extraOptions');
    const handleCollapseFrontendFilters = () => this.collapseSection('frontendFilters');

    return (
      <Fragment>
        <h5>
          <span className="icon fa fa-puzzle-piece" title="Widget" />
          {' '}
          <FormattedMessage id="a" defaultMessage="Contents - Publish a List of Contents" />
        </h5>
        <form onSubmit={onSubmit} className="form-horizontal ContentsQueryForm">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="app.info"
                  requireFields={false}
                />
                <Field
                  component={RenderSelectInput}
                  name="contentType"
                  label={
                    <FormLabel labelId="dataModel.type" />
                    }
                  options={contentTypes}
                  optionValue="code"
                  optionDisplayName="name"
                  defaultOptionId="app.enumerator.none"
                  onChange={handleContentTypeChange}
                />
              </fieldset>
            </Col>
          </Row>
          <div className={selectedContentType ? 'visible' : 'hidden'}>
            <Row>
              <Col xs={12}>
                <fieldset className="no-padding">
                  <FormSectionTitle
                    titleId="widget.form.publishingSettings"
                    requireFields={false}
                    collapsable
                    onClick={handleCollapsePublishingSettings}
                  />
                  <Collapse isOpened={this.state.publishingSettings}>
                    <div>
                      <Field
                        component={RenderSelectInput}
                        name="modelId"
                        label={
                          <FormLabel labelId="widget.form.contentModel" />
                      }
                        options={contentModels}
                        optionValue="id"
                        optionDisplayName="descr"
                        defaultOptionId="widget.form.default"
                      />
                      <Field
                        component={RenderSelectInput}
                        name="maxElemForItem"
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
                        name="maxElements"
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
                  <FormSectionTitle
                    titleId="widget.form.filters"
                    requireFields={false}
                    collapsable
                    onClick={handleCollapseFilters}
                  />
                  <Collapse isOpened={this.state.filters}>
                    <FormGroup>
                      <label htmlFor="categories" className="col-xs-2 control-label">
                        <FormLabel labelId="menu.categories" />
                      </label>
                      <Col xs={12} sm={10}>
                        <FieldArray
                          component={MultiSelectRenderer}
                          name="categories"
                          options={allCategories}
                          selectedValues={renderCategories}
                          labelKey="name"
                          valueKey="code"
                          allMode
                        />
                        <div className="ContentsQueryForm__inclusiveOr">
                          <Field
                            component={ButtonComponent}
                            toggleElement={inclusiveOrOptions}
                            name="orClauseCategoryFilter"
                          />
                        </div>
                        <span className="help-block">
                          <FormattedMessage id="widget.form.inclusiveOrTip" />
                        </span>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="categories" className="col-xs-2 control-label">
                        <FormLabel labelId="app.filter" />
                      </label>
                      <Col xs={12} sm={10}>
                        <FieldArray
                          intl={intl}
                          component={FiltersSelectRenderer}
                          name="filters"
                          options={filters}
                          suboptions={filtersSuboptions}
                          onResetFilterOption={onResetFilterOption}
                          filterName="filters"
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
                  <FormSectionTitle
                    titleId="widget.form.extraOptions"
                    requireFields={false}
                    collapsable
                    onClick={handleCollapseExtraOptions}
                  />
                  <Collapse isOpened={this.state.extraOptions}>
                    <Alert type="info" onDismiss={null}>
                      <FormattedMessage id="widget.form.extraOptionsDescription" />
                    </Alert>
                    <div>
                      {renderTitleFields}
                      <Field
                        component={RenderSelectInput}
                        name="Page"
                        label={
                          <FormLabel labelId="widget.form.page" />
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
                  <FormSectionTitle
                    titleId="widget.form.frontendFilters"
                    requireFields={false}
                    collapsable
                    onClick={handleCollapseFrontendFilters}
                  />
                  <Collapse isOpened={this.state.frontendFilters}>
                    <FormGroup className="clearfix">
                      <label htmlFor="categories" className="col-xs-2 control-label">
                        <FormLabel labelId="app.filter" />
                      </label>
                      <Col xs={12} sm={10}>
                        <FieldArray
                          intl={intl}
                          component={FiltersSelectRenderer}
                          name="userFilters"
                          options={frontendFilters}
                          suboptions={frontendFiltersSuboptions}
                          onResetFilterOption={onResetFilterOption}
                          filterName="frontendFilters"
                        />
                      </Col>
                    </FormGroup>
                  </Collapse>
                </fieldset>
              </Col>
            </Row>
          </div>
          <br />
          <Row>
            <Col xs={12}>
              {renderSaveButton}
            </Col>
          </Row>
        </form>
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
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
  contentModels: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onResetFilterOption: PropTypes.func.isRequired,
  onChangeContentType: PropTypes.func.isRequired,
  onToggleInclusiveOr: PropTypes.func.isRequired,
  selectedContentType: PropTypes.string,
  selectedInclusiveOr: PropTypes.string,
};

ContentsQueryFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  languages: [],
  contentTypes: [],
  contentModels: [],
  categories: [],
  pages: [],
  selectedCategories: [],
  selectedContentType: '',
  selectedInclusiveOr: '',
};

const ContentsQueryForm = reduxForm({
  form: 'widgets.contentsQuery',
})(ContentsQueryFormBody);

export default ContentsQueryForm;
