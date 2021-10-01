import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Spinner } from 'patternfly-react';
import Panel from 'react-bootstrap/lib/Panel';
import ContentVersionDetailsValueItem from 'ui/versioning/details/ContentVersionDetailsValueItem';

class ContentVersionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLangCode: '',
    };
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  onLanguageChange(newCurrentLanguageCode) {
    this.setState({
      currentLangCode: newCurrentLanguageCode,
    });
  }

  render() {
    const {
      loading, languages, contentDetails, domain,
    } = this.props;
    const { currentLangCode } = this.state;
    const { attributes = [] } = contentDetails;
    const defaultActiveLanguage = languages.filter(language => language.isDefault)[0] || {};
    const renderTabContents = languages.map((language) => {
      const { code, name } = language;
      return (
        <Tab key={code} eventKey={code} title={name}>
          <Panel>
            <Panel.Body>
              {
            attributes.map(attribute => (
              <ContentVersionDetailsValueItem
                key={attribute.code}
                attribute={attribute}
                currentLangCode={currentLangCode || defaultActiveLanguage.code}
                defaultLangCode={defaultActiveLanguage.code}
                domain={domain}
              />
            ))
          }
            </Panel.Body>
          </Panel>
        </Tab>
      );
    });
    return (
      <Spinner loading={!!loading}>
        <div>
          <Tabs
            defaultActiveKey={defaultActiveLanguage.code}
            animation={false}
            id="detail-lang-tabs"
            onSelect={langCode => this.onLanguageChange(langCode)}
          >
            {renderTabContents}
          </Tabs>
        </div>
      </Spinner>
    );
  }
}

ContentVersionDetails.propTypes = {
  onDidMount: PropTypes.func,
  languages: PropTypes.arrayOf(PropTypes.shape({
  })),
  loading: PropTypes.bool,
  contentDetails: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  domain: PropTypes.string,
};

ContentVersionDetails.defaultProps = {
  onDidMount: () => {},
  languages: [],
  loading: false,
  contentDetails: {
    attributes: [],
  },
  domain: '',
};

export default ContentVersionDetails;
