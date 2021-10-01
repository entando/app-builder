import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import { get, isEmpty } from 'lodash';
import { Button, Row, Col, DropdownButton, MenuItem } from 'patternfly-react';
import SectionTitle from 'ui/common/SectionTitle';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import ContentsFilterModalContainer from 'ui/widget-forms/contents-filter/ContentsFilterModalContainer';
import NoDefaultWarningModal from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { getContentById } from 'api/contents';

import { SINGLE_CONTENT_CONFIG } from 'ui/widget-forms/const';
import ContentTableRow from 'ui/widget-forms/publish-single-content-config/ContentTableRow';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

export const SingleContentConfigContainerId = `widgets.${SINGLE_CONTENT_CONFIG}`;

export class SingleContentConfigFormBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedContent: null,
    };
    this.handleContentSelect = this.handleContentSelect.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();

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
      } else {
        this.fetchContentById(chosenContent.contentId);
      }
    }
  }

  async fetchContentById(contentId) {
    const response = await getContentById(contentId);
    const json = await response.json();
    if (response.ok) {
      const selectedContent = json.payload;
      this.handleContentSelect(selectedContent, false);
    }
  }

  handleContentSelect(selectedContent, closeModal = true) {
    const { onSelectContent, loadContentTypeDetails } = this.props;
    const contentId = get(selectedContent, 'contentId', get(selectedContent, 'id', ''));
    const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
    const contentTypeCode = get(selectedContent, 'typeCode', typeCodeSub);
    loadContentTypeDetails(contentTypeCode);
    this.setState({ selectedContent });
    onSelectContent(selectedContent, closeModal);
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
      invalid,
      dirty,
      submitting,
      appTourProgress,
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
          <Button
            className="pull-right AddContentTypeFormBody__save--btn app-tour-step-21"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting || !contentExists}
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
        </Col>
      </Row>
    );
  }

  renderFormFields() {
    const {
      contentTemplates,
      invalid,
      submitting,
      intl,
      showFilterModal,
      onDiscard,
      ownerGroup,
      joinGroups,
      extFormName,
      putPrefixField,
      contentTypes,
      onClickAddContent,
      appTourProgress,
    } = this.props;

    const { selectedContent } = this.state;

    const content = selectedContent;
    const contentId = get(content, 'contentId', get(content, 'id', ''));
    const contentDescription = get(content, 'contentDescription', get(content, 'description', ''));
    const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
    const contentTypeCode = get(content, 'typeCode', typeCodeSub);

    const filterByCode = contentTemplate => contentTemplate.contentType === contentTypeCode;
    const contentTemplatesByContentType = [{ id: 'default', descr: intl.formatMessage({ id: 'widget.form.default' }) },
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
              { contentId.length > 0 && <ContentTableRow content={content} intl={intl} /> }
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
          invalid={invalid}
          submitting={submitting}
          onSave={this.handleContentSelect}
          onDiscard={onDiscard}
          ownerGroup={ownerGroup}
          joinGroups={joinGroups}
          compatibility={{
            joinGroups, ownerGroup,
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
        {!extFormName && this.renderActionButtons()}
      </div>
    );
  }

  render() {
    const {
      extFormName,
      invalid,
      submitting,
      intl,
      onSave,
      onDiscard,
      appTourProgress,
    } = this.props;

    const formFields = this.renderFormFields();

    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            {extFormName ? formFields : this.enclosedWithForm(formFields)}
          </Col>
        </Row>
        {!extFormName && appTourProgress !== APP_TOUR_STARTED && (
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
            invalid={invalid}
            submitting={submitting}
            onSave={onSave}
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
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
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
  ownerGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  extFormName: PropTypes.string,
  putPrefixField: PropTypes.func,
  onClickAddContent: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  appTourProgress: PropTypes.string,
  loadContentTypeDetails: PropTypes.func.isRequired,
};

SingleContentConfigFormBody.defaultProps = {
  chosenContent: {},
  dirty: false,
  ownerGroup: '',
  joinGroups: [],
  extFormName: '',
  handleSubmit: () => {},
  invalid: false,
  submitting: false,
  putPrefixField: name => name,
  contentTypes: {},
  appTourProgress: '',
};

export default reduxForm({
  form: SingleContentConfigContainerId,
})(SingleContentConfigFormBody);
