import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import { withFormik, Field } from 'formik';
import { get, isEmpty } from 'lodash';
import { Button, Row, Col, DropdownButton, MenuItem } from 'patternfly-react';
import SectionTitle from 'ui/common/SectionTitle';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import ContentsFilterModalContainer from 'ui/widget-forms/contents-filter/ContentsFilterModalContainer';
import NoDefaultWarningModal from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { getContentById } from 'api/contents';

import ContentTableRow from 'ui/widget-forms/publish-single-content-config/ContentTableRow';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import WidgetConfigPortal from 'ui/widgets/config/WidgetConfigPortal';

export class SingleContentConfigFormBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedContent: null,
      contentLoading: false,
    };
    this.handleContentSelect = this.handleContentSelect.bind(this);
    this.renderFormFields = this.renderFormFields.bind(this);
  }

  componentDidMount() {
    const { onDidMount, setFieldValue } = this.props;
    onDidMount(setFieldValue);

    // fetch content from URL params
    const queryString = window.location.search;
    if (queryString.includes('contentId')) {
      const urlParams = new URLSearchParams(queryString);
      const contentId = urlParams.get('contentId');
      this.fetchContentById(contentId);
    }
  }

  componentDidUpdate(prevProps) {
    const { chosenContent } = this.props;
    const { selectedContent } = this.state;
    const isNewContent = window.location.search.includes('contentId');

    if (
      prevProps.chosenContent !== chosenContent
      && !isEmpty(chosenContent)
      && isEmpty(selectedContent)
      && !isNewContent
    ) {
      if (chosenContent.status) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ selectedContent: chosenContent });
      } else if (!this.state.contentLoading && chosenContent.contentId) {
        this.fetchContentById(chosenContent.contentId);
      }
    }
  }

  async fetchContentById(contentId) {
    this.setState({ contentLoading: true });
    const response = await getContentById(contentId);
    const json = await response.json();
    this.setState({ contentLoading: false });
    if (response.ok) {
      const selectedContent = json.payload;
      this.handleContentSelect(selectedContent, false);
    }
  }

  handleContentSelect(selectedContent, closeModal = true) {
    const {
      onSelectContent, loadContentTypeDetails, setFieldValue, putPrefixField,
    } = this.props;
    const contentId = get(selectedContent, 'contentId', get(selectedContent, 'id', ''));
    const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
    const contentTypeCode = get(selectedContent, 'typeCode', typeCodeSub);
    loadContentTypeDetails(contentTypeCode, setFieldValue);
    this.setState({ selectedContent });
    // if closeModal is true, it means we selected content from modal
    // and now we need to reset contentModelId to default
    if (closeModal) {
      setFieldValue(putPrefixField('modelId'), 'default');
    }
    onSelectContent(selectedContent, closeModal, setFieldValue);
  }

  enclosedWithForm(fields) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal SingleContentConfigForm well">
        {fields}
      </form>
    );
  }

  renderActionButtons() {
    const {
      onCancel,
      onDiscard,
      isValid,
      dirty,
      isSubmitting,
      appTourProgress,
      onSave,
      submitForm,
    } = this.props;

    const { selectedContent } = this.state;

    const handleCancelClick = () => {
      if (dirty && appTourProgress !== APP_TOUR_STARTED) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const contentExists = get(selectedContent, 'id', get(selectedContent, 'contentId', false));
    return (
      <Row className="SingleContentConfigFormBody__actionBar">
        <Col xs={12}>
          <WidgetConfigPortal>
            <Button
              className="pull-right AddContentTypeFormBody__save--btn app-tour-step-21"
              type="submit"
              bsStyle="primary"
              disabled={!isValid || isSubmitting || !contentExists}
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
        </Col>
      </Row>
    );
  }

  renderFormFields() {
    const {
      contentTemplates,
      isValid,
      isSubmitting,
      intl,
      showFilterModal,
      onDiscard,
      putPrefixField,
      contentTypes,
      onClickAddContent,
      appTourProgress,
      values,
      parentField,
    } = this.props;

    const { selectedContent } = this.state;

    const content = selectedContent;
    const contentId = get(content, 'contentId', get(content, 'id', ''));
    const contentDescription = get(content, 'contentDescription', get(content, 'description', ''));
    const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
    const contentTypeCode = get(content, 'typeCode', typeCodeSub);

    const filterByCode = contentTemplate => contentTemplate.contentType === contentTypeCode;
    const contentTemplatesByContentType = [
      { id: 'default', descr: intl.formatMessage({ id: 'widget.form.default' }) },
      ...contentTemplates.filter(filterByCode)];

    const contentTemplateOptions = contentTemplatesByContentType
      .map(item => (
        <option key={`opt-${item.id}`} value={item.id}>
          {item.descr}
        </option>
      ));

    return (
      <div>
        <span className="icon fa fa-puzzle-piece" title="Widget" />
        <h5 className="SingleContentConfigFormBody__widgetTitle"><FormattedMessage id="widget.singleContent.config.title" /> </h5>
        <SectionTitle
          nameId="app.info"
          noRequired
        />
        <Row>
          <Col xs={6}>
            <h3 className="SingleContentConfigFormBody__contentTitle">
              <FormattedMessage id="widget.singleContent.config.content" />: {contentId} - {contentDescription}
            </h3>
          </Col>
          <Col xs={6} className="SingleContentConfigFormBody__addButtons">
            <Button
              className="ChooseContentBody__add--existing app-tour-step-18"
              bsStyle="primary"
              onClick={() => showFilterModal(appTourProgress)}
            >
              {content ? <FormattedMessage id="widget.singleContent.config.changeContent" /> : <FormattedMessage id="widget.singleContent.config.addExistingContent" />}
            </Button>
            {' '}
            <DropdownButton
              bsStyle="primary"
              title={intl.formatMessage({ id: 'widget.singleContent.config.addNewContent' })}
              id="addContent"
            >
              {
                contentTypes && contentTypes.map(contentType => (
                  <MenuItem
                    eventKey={contentType.code}
                    key={contentType.code}
                    onClick={() => (
                      onClickAddContent({
                        typeCode: contentType.code,
                        typeDescription: contentType.name,
                      })
                    )}
                  >
                    {contentType.name}
                  </MenuItem>
                ))
              }
            </DropdownButton>
          </Col>
        </Row>

        <Field name={putPrefixField('chosenContent')} component="div" />
        <Field
          name={putPrefixField('contentId')}
          component="span"
        />
        <Field name={putPrefixField('chosenContentType')} component="span" />

        <div className="SingleContentConfigFormBody__table">
          <table className="table dataTable table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="cms.contents.description" /></th>
                <th><FormattedMessage id="cms.contents.firstEditor" /></th>
                <th><FormattedMessage id="cms.contents.lastModified" /></th>
                <th><FormattedMessage id="cms.contents.typeCode" /></th>
                <th><FormattedMessage id="cms.contents.created" /></th>
                <th><FormattedMessage id="cms.contents.onLine" /></th>
                <th><FormattedMessage id="cms.contents.restriction" /></th>
              </tr>
            </thead>
            <tbody>
              {contentId.length > 0 && <ContentTableRow content={content} intl={intl} />}
            </tbody>
          </table>
        </div>

        <div className="SingleContentConfigFormBody__templateTitle">
          <SectionTitle
            nameId="widget.form.publishingSettings"
            noRequired
          />
          <span><FormattedMessage id="widget.form.contentTemplate" /></span>
          <Field
            name={putPrefixField('contentDescription')}
            component="span"
          />
        </div>
        <ContentsFilterModalContainer
          modalTitleText={intl.formatMessage({ id: 'cms.contents.modal.filter.title' })}
          invalid={!isValid}
          submitting={isSubmitting}
          onSave={this.handleContentSelect}
          onDiscard={onDiscard}
          ownerGroup={values.ownerGroup}
          joinGroups={values.joinGroups}
          compatibility={{
            joinGroups: values.joinGroups, ownerGroup: values.ownerGroup,
          }}
        />
        <NoDefaultWarningModal />

        {contentId && (
          <Row>
            <Col xs={12}>
              <Field
                component="select"
                name={putPrefixField('modelId')}
                className="form-control"
              >
                {contentTemplateOptions}
              </Field>
            </Col>
          </Row>
        )}
        {!parentField && this.renderActionButtons()}
      </div>
    );
  }

  render() {
    const {
      isValid,
      isSubmitting,
      intl,
      onSave,
      onDiscard,
      appTourProgress,
      parentField,
      submitForm,
    } = this.props;

    const formFields = this.renderFormFields();

    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            {/* {putPrefixField ? formFields : this.enclosedWithForm(this.renderFormFields)} */}
            {this.enclosedWithForm(formFields)}
          </Col>
        </Row>
        {!parentField && appTourProgress !== APP_TOUR_STARTED && (
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
            invalid={!isValid}
            submitting={isSubmitting}
            onSave={() => onSave(submitForm)}
            onDiscard={onDiscard}
          />
        )}
      </Fragment>
    );
  }
}

SingleContentConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  chosenContent: PropTypes.shape({
    id: PropTypes.string,
    contentId: PropTypes.string,
    status: PropTypes.string,
  }),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  showFilterModal: PropTypes.func.isRequired,
  onSelectContent: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  putPrefixField: PropTypes.func,
  onClickAddContent: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  appTourProgress: PropTypes.string,
  loadContentTypeDetails: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    ownerGroup: PropTypes.string,
    joinGroups: PropTypes.arrayOf(PropTypes.string),
  }),
  setFieldValue: PropTypes.func.isRequired,
  parentField: PropTypes.string,
  submitForm: PropTypes.func.isRequired,
};

SingleContentConfigFormBody.defaultProps = {
  chosenContent: {},
  dirty: false,
  handleSubmit: () => {},
  putPrefixField: name => name,
  contentTypes: {},
  appTourProgress: '',
  values: {
    ownerGroup: '',
    joinGroups: [],
  },
  parentField: '',
};

const SingleContentConfigForm = withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values, setSubmitting);
  },
  displayName: 'SingleContentConfigFormBodyFormik',
})(SingleContentConfigFormBody);

export default SingleContentConfigForm;
