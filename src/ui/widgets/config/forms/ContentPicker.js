import React, { Component, Fragment } from 'react';
import AsyncTypeAheadSelect from 'ui/widgets/config/forms/AsyncTypeAheadSelect';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Row, Col, FormGroup } from 'patternfly-react';

import { Field, reduxForm } from 'redux-form';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

class ContentPickerBody extends Component {
  constructor(props) {
    super(props);
    this.handlePickContent = this.handlePickContent.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.typeaheadRef = React.createRef();
    this.state = {
      selectedContent: null,
    };
  }

  componentDidMount() {
    this.props.onDidMount();
  }

  handleContentChange(contentArray) {
    const selectedContent = contentArray[0];
    this.setState({ selectedContent });
  }

  handlePickContent() {
    const { selectedContent } = this.state;
    const { onPickContent } = this.props;
    if (selectedContent == null) return;
    onPickContent(selectedContent);
    this.typeaheadRef.current.getInstance().clear();
    this.setState({ selectedContent: null });
  }

  render() {
    const {
      contentTypeList,
      contentStatusList,
      fetchContents,
      intl,
      multipleContentsMode,
      contentsNumber,
    } = this.props;
    const searchPlaceholderMsg = intl.formatMessage({ id: 'contentPicker.searchPlaceholder' });
    let addButtonDisabled = false;
    if (multipleContentsMode) {
      addButtonDisabled = this.selectedContent != null;
    } else {
      addButtonDisabled = (contentsNumber === 0 && this.state.selectedContent == null)
      || contentsNumber > 0;
    }
    const typeAheadDisabled = !multipleContentsMode && contentsNumber > 0;
    const renderAddButton = (
      <Button
        bsStyle="primary"
        onClick={this.handlePickContent}
        disabled={addButtonDisabled}
      >
    +
      </Button>);
    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <Field
              name="typeCode"
              component={RenderSelectInput}
              label={<FormLabel labelId="contentPicker.type" />}
              options={contentTypeList}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="contentPicker.allTypes"
            />
          </Col>
          <Col xs={6}>
            <Field
              name="status"
              component={RenderSelectInput}
              label={<FormLabel labelId="contentPicker.status" />}
              options={contentStatusList}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="contentPicker.allStatuses"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <AsyncTypeAheadSelect
              id="content-picker"
              label={<FormLabel labelId="contentPicker.description" />}
              placeholder={searchPlaceholderMsg}
              ref={this.typeaheadRef}
              onSearch={fetchContents}
              onChange={this.handleContentChange}
              labelKey={option => `${option.id} - ${option.description}`}
              useCache={false}
              disabled={typeAheadDisabled}
            />
          </Col>
          <Col xs={2}>
            <FormGroup>
              {renderAddButton}
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const ContentPicker = reduxForm()(ContentPickerBody);

ContentPickerBody.propTypes = {
  intl: intlShape.isRequired,
  onPickContent: PropTypes.func.isRequired,
  multipleContentsMode: PropTypes.bool,
  contentsNumber: PropTypes.number,
  onDidMount: PropTypes.func.isRequired,
  fetchContents: PropTypes.func.isRequired,
  contentTypeList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentStatusList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ContentPickerBody.defaultProps = {
  multipleContentsMode: true,
  contentsNumber: 0,
};

export default ContentPicker;
