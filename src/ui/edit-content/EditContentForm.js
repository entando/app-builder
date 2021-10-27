import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup, ControlLabel, Spinner, Button } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import Panel from 'react-bootstrap/lib/Panel';
import { required, maxLength } from '@entando/utils';
import { Collapse } from 'react-collapse';

import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import StickySave from 'ui/common/StickySave';
import SectionTitle from 'ui/common/SectionTitle';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderVersionText from 'ui/common/form/RenderVersionText';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import ExtCategoryTreeContainer from 'ui/categories/common/ExtCategoryTreeSelectorContainer';

import { WORK_MODE_ADD, WORK_MODE_EDIT } from 'state/edit-content/types';
import ContentAttributesContainer from 'ui/edit-content/content-attributes/ContentAttributesContainer';
import SingleContentVersioningHistoryContainer from 'ui/versioning/SingleContentVersioningHistoryContainer';

const maxLength255 = maxLength(255);

const messages = defineMessages({
  contentDesctiption: {
    id: 'cms.contents.edit.contentDescription.placeholder',
    defaultMessage: 'Descriptions help you archive, sort, and find contents',
  },
  creator: {
    id: 'cms.contents.edit.version.creator',
    defaultMessage: 'created - by',
  },
  modifier: {
    id: 'cms.contents.edit.version.modifier',
    defaultMessage: 'modified by',
  },
  sameAuthor: {
    id: 'cms.contents.edit.version.you',
    defaultMessage: 'you',
  },
});

const fieldFocus = (el, addDelay) => {
  const focusEl = el.current;
  if (!focusEl) {
    return;
  }
  const runFocus = () => focusEl.getRenderedComponent().focus();
  if (addDelay) {
    setTimeout(runFocus, addDelay);
  } else {
    runFocus();
  }
};

export class EditContentFormBody extends React.Component {
  constructor(props) {
    super(props);
    const { workMode } = props;
    this.ownerGroupInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.state = {
      infoOpen: true,
      groupsOpen: workMode === WORK_MODE_ADD,
      categoriesOpen: false,
      attributesOpen: false,
    };

    this.handleOwnerGroupChange = this.handleOwnerGroupChange.bind(this);
  }

  componentDidMount() {
    const {
      onDidMount, match: { params = {} },
      onIncompleteData,
    } = this.props;
    const { id: contentId, contentType } = params;
    const fetchContentParams = `/${contentId}`;
    if (contentType == null && contentId == null) return onIncompleteData();
    // if contentId from params is null, it means we are creating a new content
    if (contentId == null) {
      fieldFocus(this.ownerGroupInput);
    }
    return onDidMount(fetchContentParams);
  }

  componentDidUpdate(prevProps) {
    const {
      dirty, changeStatus, content, status,
    } = this.props;
    if (dirty !== prevProps.dirty) {
      if (dirty) {
        if (status === prevProps.status) {
          changeStatus('draft');
        }
      } else {
        changeStatus((content || {}).status);
      }
    }
    if (content !== prevProps.content) {
      fieldFocus(this.descriptionInput);
    }
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  setSection(sectionName, value) {
    this.setState({
      [sectionName]: value,
    });
  }

  collapseSection(sectionName) {
    this.setState(({ [sectionName]: currentVisibility }) => ({
      [sectionName]: !currentVisibility,
    }));
  }

  handleOwnerGroupChange(code) {
    const {
      workMode,
      onSetOwnerGroupDisable,
      resetSection,
    } = this.props;
    if (code && workMode === WORK_MODE_EDIT) {
      onSetOwnerGroupDisable(true);
    }
    if (workMode === WORK_MODE_ADD) {
      this.setSection('infoOpen', true);
      this.setSection('categoriesOpen', true);
      // reset attributes sections
      resetSection('attributes');
      fieldFocus(this.descriptionInput, 10);
    }
  }

  render() {
    const {
      infoOpen, groupsOpen, categoriesOpen, attributesOpen,
    } = this.state;
    const {
      intl,
      groups,
      allGroups,
      content,
      language,
      workMode,
      handleSubmit,
      onSubmit,
      invalid,
      submitting,
      onUnpublish,
      selectedJoinGroups,
      contentType: cType,
      currentUser: currentUserName,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      loading,
      match: { params = {} },
      selectedOwnerGroup,
      closeModal,
      missingTranslations,
      saveType,
    } = this.props;
    const { id } = params;
    const {
      version, lastModified, firstEditor: creatorUserName, lastEditor: modifierUserName,
      onLine,
    } = content || {};
    const newContentsType = {
      typeDescription: cType.name,
      typeCode: cType.code,
    };
    const contentType = content.typeDescription || newContentsType.typeDescription || '';
    const typeCode = content.typeCode || newContentsType.typeCode;
    const groupsWithEmptyOption = [...groups];
    const handleCollapseInfo = val => this.collapseSection('infoOpen', val);
    const handleCollapseGroups = val => this.collapseSection('groupsOpen', val);
    const handleCollapseCategories = val => this.collapseSection('categoriesOpen', val);
    const handleCollapseAttributes = val => this.collapseSection('attributesOpen', val);
    const renderContentVersioningHistory = workMode === WORK_MODE_EDIT && id && (
      <Row className="no-padding">
        <Panel>
          <Panel.Body>
            <legend>
              <FormattedMessage id="cms.versioning.history" defaultMessage="History" />
            </legend>
            <SingleContentVersioningHistoryContainer id={id} />
          </Panel.Body>
        </Panel>
      </Row>
    );

    const handleUpdateTranslations = () => {
      if (missingTranslations.length) {
        const { lang, attributePath } = missingTranslations[0];
        // open language tab
        const tabId = `content-attributes-tabs-tab-${lang}`;
        document.getElementById(tabId).click();
        // wait for tab to change

        setTimeout(() => {
          // set focus to element
          const inputId = `${attributePath}.values.${lang}`;
          const element = document.getElementById(inputId)
          || document.getElementsByName(inputId)[0];

          if (element) {
            const fieldCollapse = element.closest('.ContentFormFieldCollapse');
            if (fieldCollapse && fieldCollapse.classList.contains('closed')) {
              fieldCollapse.querySelector('[role=button]').click();
              setTimeout(() => element.focus(), 100);
            } else {
              element.focus();
            }
          }
        }, 500);
      }
    };

    const modalButtons = [
      <Button
        bsStyle="warning"
        id="TranslationWarningModal__button-ignore"
        type="submit"
        onClick={handleSubmit(values => onSubmit({
          ...values,
          saveType,
        }, undefined, true))
          }
      >
        <FormattedMessage id="cms.label.ignore" />
      </Button>,
      <Button
        type="button"
        bsStyle="primary"
        id="TranslationWarningModal__button-update"
        onClick={() => {
          closeModal();
          handleUpdateTranslations();
        }}
      >
        <FormattedMessage id="cms.label.update" />
      </Button>,
    ];

    const classContentArea = ['EditContentForm__content', ...(
      workMode === WORK_MODE_EDIT ? ['EditContentForm__content--editmode'] : []
    )];

    return (
      <Spinner loading={!!loading}>
        <form
          className="EditContentForm form-horizontal"
        >
          <div className="StickySave__sidetop">
            <StickySave
              intl={intl}
              lastAutoSaveTime={lastModified}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              invalid={invalid}
              isDirty={dirty}
              onCancel={onCancel}
              onDiscard={onDiscard}
              onSave={onSave}
              submitting={submitting}
              onLine={onLine}
              content={content}
              onUnpublish={onUnpublish}
              {...this.props}
            />
          </div>
          <Col className={classContentArea} xs={12}>
            <Row className="InfoFormBody EditContentForm__outer-fieldset">
              <SectionTitle
                nameId="cms.contents.edit.info"
                onClick={handleCollapseInfo}
                collapsable
                noRequired
                isOpened={infoOpen}
              />
              <Collapse isOpened={infoOpen}>
                <fieldset className="EditContentForm__fieldset">
                  <FormGroup>
                    <Col xs={12}>
                      <Field
                        component={RenderVersionText}
                        name="id"
                        label={<FormLabel labelId="cms.contents.edit.version.label" />}
                        version={version || '0.0'}
                        labelSize={2}
                        currentUserName={currentUserName}
                        creatorUserName={creatorUserName || currentUserName}
                        modifierUserName={modifierUserName || currentUserName}
                        modifierText={intl.formatMessage(messages.modifier)}
                        creatorText={intl.formatMessage(messages.creator)}
                        sameAuthorText={intl.formatMessage(messages.sameAuthor)}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col xs={12}>
                      <Field
                        component={RenderTextInput}
                        name="contentType"
                        label={<FormLabel labelId="cms.contents.edit.contentType.label" />}
                        disabled
                        input={{ value: contentType }}
                      />
                    </Col>
                  </FormGroup>
                  <div id="contentDescriptionWrapper">
                    <FormGroup>
                      <Col xs={12}>
                        <Field
                          component={RenderTextInput}
                          name="description"
                          forwardRef
                          ref={this.descriptionInput}
                          validate={[required, maxLength255]}
                          label={(
                            <FormLabel
                              labelId="cms.contents.edit.contentDescription.label"
                              helpId="cms.contents.edit.contentDescription.tooltip"
                              required
                            />
      )}
                          placeholder={intl.formatMessage(messages.contentDesctiption)}
                        />
                      </Col>
                    </FormGroup>
                  </div>
                </fieldset>
              </Collapse>
            </Row>
            <Row className="GroupsFormBody EditContentForm__outer-fieldset">
              <SectionTitle
                nameId="cms.contents.edit.groups"
                onClick={handleCollapseGroups}
                collapsable
                noRequired
                isOpened={groupsOpen}
              />
              <Collapse isOpened={groupsOpen}>
                <fieldset className="EditContentForm__fieldset">
                  <Col xs={12}>
                    <FormGroup>
                      <Field
                        component={RenderDropdownTypeaheadInput}
                        name="mainGroup"
                        label={(
                          <FormLabel
                            labelId="cms.contents.edit.groups.ownerGroup.label"
                            helpId="cms.contents.edit.groups.ownerGroup.tooltip"
                            required
                          />
                        )}
                        options={groupsWithEmptyOption}
                        labelSize={2}
                        labelKey="name"
                        valueKey="code"
                        onChange={this.handleOwnerGroupChange}
                        disabled={workMode === WORK_MODE_EDIT}
                        placeholder={intl.formatMessage({ id: 'cms.label.chooseoption' })}
                        validate={[required]}
                      />
                    </FormGroup>
                    <div id="contentGroupsWrapper">
                      <FormGroup>
                        <Field
                          component={RenderDropdownTypeaheadInput}
                          name="groups"
                          multiple
                          label={(
                            <FormLabel labelId="cms.contents.edit.groups.joinGroup.label" />
                          )}
                          options={allGroups}
                          labelSize={2}
                          labelKey="name"
                          valueKey="code"
                          placeholder={intl.formatMessage({ id: 'cms.label.chooseoption' })}
                        />
                      </FormGroup>
                    </div>
                  </Col>
                </fieldset>
              </Collapse>
            </Row>

            <Row className="GroupsFormBody EditContentForm__outer-fieldset">
              <SectionTitle
                nameId="cms.contents.edit.categories"
                onClick={handleCollapseCategories}
                collapsable
                noRequired
                isOpened={categoriesOpen}
              />
              <Collapse isOpened={categoriesOpen}>
                <fieldset className="EditContentForm__fieldset">
                  <FormGroup>
                    <ControlLabel htmlFor="contentCategories" className="col-xs-2">
                      <FormLabel labelId="cms.contents.edit.categories" />
                    </ControlLabel>
                    <Col xs={10}>
                      <Field
                        component={ExtCategoryTreeContainer}
                        language={language}
                        name="contentCategories"
                        treeNameId="cms.contents.edit.categories.categoriesTree"
                      />
                    </Col>
                  </FormGroup>
                </fieldset>
              </Collapse>
            </Row>

            <div id="attributesWrapper" className="EditContentForm__attributes-area">
              <Row>
                <SectionTitle
                  nameId="cms.contents.edit.contentAttributes"
                  onClick={handleCollapseAttributes}
                  isOpened={attributesOpen}
                />
                {(content.attributes || typeCode) && (
                <ContentAttributesContainer
                  attributes={content.attributes}
                  typeCode={typeCode}
                  content={content}
                  mainGroup={selectedOwnerGroup}
                  joinGroups={selectedJoinGroups}
                  isNewContent={workMode === WORK_MODE_ADD}
                />
                )}
              </Row>
            </div>

            {renderContentVersioningHistory}
          </Col>
        </form>
        <ConfirmCancelModalContainer
          modalId="TranslationWarningModal"
          buttonsList={modalButtons}
          modalTitleText={intl.formatMessage({ id: 'cms.contents.modal.missingTranslations.title' })}
          contentText={intl.formatMessage({ id: 'cms.contents.modal.missingTranslations.content' })}
        />
      </Spinner>
    );
  }
}
EditContentFormBody.propTypes = {
  intl: intlShape.isRequired,
  workMode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  content: PropTypes.shape({
    typeDescription: PropTypes.string,
    typeCode: PropTypes.string,
    mainGroup: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  currentUser: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  allGroups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onDidMount: PropTypes.func.isRequired,
  onSetOwnerGroupDisable: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({}) }).isRequired,
  onIncompleteData: PropTypes.func.isRequired,
  onWillUnmount: PropTypes.func.isRequired,
  onUnpublish: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  contentType: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  }),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedOwnerGroup: PropTypes.string,
  changeStatus: PropTypes.func.isRequired,
  status: PropTypes.string,
  resetSection: PropTypes.func.isRequired,
  missingTranslations: PropTypes.arrayOf(PropTypes.shape({
    lang: PropTypes.string,
    attributePath: PropTypes.string,
  })).isRequired,
  saveType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

EditContentFormBody.defaultProps = {
  selectedJoinGroups: [],
  content: {},
  invalid: false,
  submitting: false,
  contentType: {},
  dirty: false,
  loading: false,
  groups: [],
  allGroups: [],
  selectedOwnerGroup: '',
  status: '',
};

const EditContentForm = reduxForm({
  form: 'editcontentform',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditContentFormBody);

export default EditContentForm;
