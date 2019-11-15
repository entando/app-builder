import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Collapse } from 'react-collapse';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
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
      showFilterOptions: true,
      publishingSettings: false,
      filters: true,
      extraOptions: false,
      frontendFilters: false,
    };
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
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
      selectedCategories, selectedInclusiveOr,
      onToggleInclusiveOr, onChangeContentType, selectedOrderType,
      selectedFilters,
    } = this.props;

    const languages = ['en', 'it'];

    const elementNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20]
      .map(i => Object.assign({}, { code: i, name: i }));
    const normalizedCategories =
      this.normalizeTitles(categories.filter(c => c.code !== CATEGORY_HOME));
    const normalizedPages = this.normalizeTitles(pages);

    const renderTitleFields = !isUndefined(languages) ? languages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={`titles.${langCode}`}
          label={<FormLabel langLabelText={langCode} labelId="app.title" />}
          validate={[maxLength70]}
        />
      )) : null;

    const renderLinkTextFields = !isUndefined(languages) ? languages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={`linkText.${langCode}`}
          label={<FormLabel langLabelText={langCode} labelId="widget.form.linkText" />}
          validate={[maxLength70]}
        />
      )) : null;

    const ButtonComponent = () => (
      <Button
        bsStyle="default"
        type="button"
        disabled={selectedCategories.length < 2}
        active={selectedInclusiveOr}
        onClick={() => onToggleInclusiveOr(selectedInclusiveOr)}
        className={`ContentsQueryForm__inclusiveOr ${selectedInclusiveOr ? 'ContentsQueryForm__inclusiveOr--active' : ''}`}
      >
        <FormattedMessage id="widget.form.inclusiveOr" defaultMessage="Use inclusive filter (OR)" />
      </Button>);

    const filters = [
      { code: 'created', nameId: 'widget.form.creationDate' },
      { code: 'modified', nameId: 'widget.form.lastModify' },
    ];

    const frontendFilters = [
      { code: 'text', nameId: 'widget.form.text' },
      { code: 'categories', nameId: 'menu.categories' },
    ];

    const handleContentTypeChange = (ev) => {
      const currentValue = ev.currentTarget.value;
      if (currentValue) {
        onChangeContentType(currentValue);
        this.setState({
          showFilterOptions: true,
        });
      } else {
        this.setState({
          showFilterOptions: false,
        });
      }
    };

    const handleCollapsePublishingSettings = () => this.collapseSection('publishingSettings');
    const handleCollapseFilters = () => this.collapseSection('filters');
    const handleCollapseExtraOptions = () => this.collapseSection('extraOptions');
    const handleCollapseFrontendFilters = () => this.collapseSection('frontendFilters');

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className="label label-default">0</span>
          <FormattedMessage id="a" defaultMessage=" Sample Frame" />
        </div>
        <div className="panel-body">
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
            <div className={this.state.showFilterOptions ? 'visible' : 'hidden'}>
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
                          name="contentModel"
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
                          name="elementsPerPage"
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
                          name="maxTotalElements"
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
                        <Col xs={10}>
                          <FieldArray
                            component={MultiSelectRenderer}
                            name="categories"
                            options={normalizedCategories}
                            selectedValues={selectedCategories}
                            labelKey="name"
                            valueKey="code"
                            emptyOptionTextId="user.profile.all"
                          />
                          <Field
                            component={ButtonComponent}
                            name="inclusiveOr"
                          />
                          <span className="help-block">
                            <FormattedMessage id="widget.form.inclusiveOrTip" />
                          </span>
                        </Col>
                      </FormGroup>
                      <FormGroup className="ContentsQueryForm__formGroup">
                        <label htmlFor="categories" className="col-xs-2 control-label">
                          <FormLabel labelId="app.filter" />
                        </label>
                        <Col xs={10}>
                          <FieldArray
                            component={FiltersSelectRenderer}
                            name="filters"
                            options={filters}
                            selectedValues={selectedFilters}
                            valueKey="code"
                            selectedOrderType={selectedOrderType}
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
                      <FormGroup>
                        <label htmlFor="categories" className="col-xs-2 control-label">
                          <FormLabel labelId="app.filter" />
                        </label>
                        <Col xs={10}>
                          <FieldArray
                            component={FiltersSelectRenderer}
                            name="frontendFilters"
                            options={frontendFilters}
                            selectedValues={[]}
                            labelKey="name"
                            valueKey="code"
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
                <Button
                  className="pull-right"
                  type="submit"
                  bsStyle="primary"
                  disabled={this.props.invalid || this.props.submitting}
                >
                  <FormattedMessage id="app.save" />
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

ContentsQueryFormBody.propTypes = {
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
  contentModels: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  selectedFilters: PropTypes.arrayOf(PropTypes.shape({})),
  selectedInclusiveOr: PropTypes.bool,
  onToggleInclusiveOr: PropTypes.func.isRequired,
  onChangeContentType: PropTypes.func.isRequired,
  selectedOrderType: PropTypes.string,
};

ContentsQueryFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  contentTypes: [],
  contentModels: [],
  categories: [],
  pages: [],
  selectedCategories: [],
  selectedInclusiveOr: false,
  selectedOrderType: '',
  selectedFilters: [],
};

const ContentsQueryForm = reduxForm({
  form: 'widgets.contentsQuery',
})(ContentsQueryFormBody);

export default ContentsQueryForm;
