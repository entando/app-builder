import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button, Icon } from 'patternfly-react';
import DeleteContentMetadataModalContainer from 'ui/content-settings/metadata/DeleteContentMetadataModalContainer';
import { reduxForm, Field } from 'redux-form';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

class ContentSettingsMetadataListBody extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onFieldKeyUp = this.onFieldKeyUp.bind(this);
  }

  onFieldKeyUp(ev) {
    if (ev.keyCode !== 13) return;
    const { submit } = this.props;
    submit();
  }

  onClickDelete(ev) {
    const { onPromptDelete } = this.props;
    const { key, metadata } = ev.currentTarget.dataset;
    onPromptDelete({ key, metadata });
  }

  render() {
    const { handleSubmit, metadata, loadings } = this.props;
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          {metadata.map(meta => (
            <Row className="ContentSettingsMetadata__list-row" key={meta.key}>
              <Col xs={12} md={2} className="text-right ContentSettingsMetadata__list-label-padded">
                {`'${meta.key}' Metadata`}
              </Col>
              <Col xs={9} md={9} className="ContentSettingsMetadata__list-input-area">
                <Field
                  component={RenderTextInput}
                  labelSize={12}
                  inputSize={12}
                  name={meta.key}
                  alignClass="text-left"
                  onKeyUp={this.onFieldKeyUp}
                  label={(
                    <FormLabel
                      labelId="cms.contentsettings.form.metadatamapping"
                      helpId="cms.contentsettings.form.metadatamapping.help"
                      helpValues={{ key: meta.key }}
                    />
                  )}
                />
                <span className="ContentSettingsMetadata__list-input-right-placeholder">
                  <FormattedMessage
                    id={
                      loadings[meta.key]
                        ? 'cms.label.savingdot'
                        : 'cms.label.presenter.placeholder'
                    }
                  />
                </span>
              </Col>
              <Col xs={12} md={1} className="text-right ContentSettingsMetadata__list-cell-del">
                <Button
                  bsStyle="danger"
                  data-key={meta.key}
                  data-metadata={meta.metadata}
                  onClick={this.onClickDelete}
                >
                  <Icon name="trash" />
                </Button>
              </Col>
            </Row>
          ))}
        </form>
        <DeleteContentMetadataModalContainer />
      </Fragment>
    );
  }
}

ContentSettingsMetadataListBody.propTypes = {
  metadata: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  loadings: PropTypes.shape({}),
  onPromptDelete: PropTypes.func.isRequired,
};

ContentSettingsMetadataListBody.defaultProps = {
  metadata: [],
  loadings: {},
};

const ContentSettingsMetadataList = reduxForm({
  form: 'settingsmetadata',
  enableReinitialize: true,
})(ContentSettingsMetadataListBody);

export default ContentSettingsMetadataList;
