import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import {
  Tabs,
  Tab,
  Row,
  Col,
  Button,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import AttributeFields from 'ui/edit-content/content-attributes/AttributeFields';
import FormLabel from 'ui/common/form/FormLabel';

class ContentAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: 'en',
    };
    this.handleSelectedLang = this.handleSelectedLang.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  handleSelectedLang(selectedLang) {
    this.setState({ selectedLang });
  }

  render() {
    const {
      attributes, languages, reInitializeForm, content, typeCode, mainGroup,
      joinGroups, locale, isNewContent, defaultLang, onDuplicateContent,
    } = this.props;
    const { selectedLang } = this.state;
    return defaultLang && (
      <Tabs
        defaultActiveKey={defaultLang}
        animation={false}
        id="content-attributes-tabs"
        onSelect={this.handleSelectedLang}
      >
        {languages.map(({ code, isDefault }) => (
          <Tab key={code} eventKey={code} title={<FormattedMessage id={`cms.language.${code}`} />}>
            {isDefault && (
            <Row>
              <Col xs={12} className="text-right">
                <FormLabel
                  labelId="cms.contents.edit.label.duplicate"
                  defaultMessage="Duplicate Content Option"
                  helpId="cms.contents.edit.label.duplicateHelp"
                />
                <Button onClick={onDuplicateContent}>
                  <FormattedMessage id="cms.contents.edit.duplicate" />
                </Button>
              </Col>
            </Row>
            )}
            <FieldArray
              data-test-id="edit-content-content-attributes-field-array"
              name="attributes"
              content={content}
              typeCode={typeCode}
              mainGroup={mainGroup}
              joinGroups={joinGroups}
              reInitializeForm={reInitializeForm}
              component={AttributeFields}
              attributes={attributes}
              langCode={code}
              selectedLangTab={selectedLang}
              isDefaultLang={isDefault}
              defaultLang={defaultLang}
              locale={locale}
              expanded={isNewContent}
            />
          </Tab>
        ))}
      </Tabs>
    );
  }
}

ContentAttributes.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onWillUnmount: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  reInitializeForm: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  typeCode: PropTypes.string.isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  locale: PropTypes.string,
  isNewContent: PropTypes.bool,
  onDuplicateContent: PropTypes.func.isRequired,
  defaultLang: PropTypes.string.isRequired,
};

ContentAttributes.defaultProps = {
  locale: '',
  isNewContent: false,
};

export default ContentAttributes;
