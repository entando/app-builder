import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { FieldArray, Field, reduxForm } from 'redux-form';
import { Button, Row, Col, Alert } from 'patternfly-react';
import { Collapse } from 'react-collapse';
import { isUndefined } from 'lodash';
import { maxLength } from '@entando/utils';
import ContentTableRenderer from 'ui/widgets/config/forms/ContentTableRenderer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const maxLength70 = maxLength(70);
const MULTIPLE_CONTENTS_WIDGET = 'row_content_viewer_list';

class HandpickedContentsConfigFormBody extends PureComponent {
  state = {
    extraOptionsOpen: false,
    publishingSettingsOpen: false,
  }

  componentDidMount() {
    this.props.onDidMount();
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
    const {
      contentModels,
      handleSubmit,
      invalid,
      submitting,
      languages,
      pages,
      intl,
      widgetCode,
    } = this.props;
    const multipleContentsMode = widgetCode === MULTIPLE_CONTENTS_WIDGET;
    const normalizedLanguages = languages.map(lang => lang.code);
    const normalizedPages = this.normalizeTitles(pages || []);

    const elementNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 50, 100, 500]
      .map(i => Object.assign({}, { code: i, name: i }));

    const renderTitleFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
      .map(langCode => (
        <Field
          key={langCode}
          component={RenderTextInput}
          name={`title_${langCode}`}
          label={<FormLabel langLabelText={langCode} labelId="app.title" />}
          validate={[maxLength70]}
          className="clearfix"
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

    const handleCollapsePublishingSettings = () => this.collapseSection('publishingSettingsOpen');
    const handleCollapseExtraOptions = () => this.collapseSection('extraOptionsOpen');

    const renderExtraOptions = multipleContentsMode ? (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <FormSectionTitle
              titleId="widget.form.extraOptions"
              requireFields={false}
              collapsable
              onClick={handleCollapseExtraOptions}
            />
            <Collapse isOpened={this.state.extraOptionsOpen}>
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
      </Row>) : null;

    return (
      <Fragment>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <Row>
            <Col xs={12}>
              <FieldArray
                component={ContentTableRenderer}
                contentModels={contentModels}
                name="contents"
                intl={intl}
                multipleContentsMode={multipleContentsMode}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="widget.form.publishingSettings"
                  requireFields={false}
                  collapsable
                  onClick={handleCollapsePublishingSettings}
                />
                <Collapse isOpened={this.state.publishingSettingsOpen}>
                  <div>
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
                  </div>
                </Collapse>
              </fieldset>
            </Col>
          </Row>
          {renderExtraOptions}
        </form>
      </Fragment>
    );
  }
}

HandpickedContentsConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  widgetCode: PropTypes.string.isRequired,
};

HandpickedContentsConfigFormBody.defaultProps = {
  languages: [],
  pages: [],
};

const HandpickedContentsConfigForm = reduxForm({
  form: 'widgets.singleContentConfig',
})(HandpickedContentsConfigFormBody);

export default HandpickedContentsConfigForm;
