import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Button, DropdownButton, MenuItem, Label, Icon } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';

class ContentTemplateSearchFormBody extends Component {
  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
    this.messages = defineMessages({
      searchPlaceholder: {
        id: 'cms.contenttemplate.searchPlaceholder',
        defaultMessage: 'Search Content Template',
      },
      valueName: {
        id: 'cms.contenttemplate.searchFilter.valueName',
        defaultMessage: 'Name',
      },
    });
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  clearSearch() {
    const { reset, submit, searchTerm } = this.props;
    reset();
    if (searchTerm !== '') setTimeout(submit, 10);
  }

  render() {
    const {
      intl,
      handleSubmit,
      selectOptions,
      onChangeSearchType,
      selectedAttribute,
    } = this.props;

    return (
      <form className="ContentTemplateList__searchform well" onSubmit={handleSubmit}>
        <Grid fluid>
          <Row>
            <Col xs={3} className="ContentTemplateList__filter-searchby">
              <Label className="ContentTemplateList__filter-searchby-label">
                <FormattedMessage
                  id="cms.contenttemplate.searchFilter.label"
                  defaultMessage="Search By"
                />
              </Label>
              <DropdownButton
                title={selectedAttribute.label}
                id="attribute"
                onSelect={onChangeSearchType}
                className="ContentTemplateList__filter-searchby-dropdown"
              >
                {selectOptions.map((option, idx) => (
                  <MenuItem key={option.value} eventKey={idx + 1}>{option.label}</MenuItem>
                ))}
              </DropdownButton>
            </Col>
            <Col xs={8}>
              <Field
                name="keyword"
                component={RenderSearchFormInput}
                onClear={this.clearSearch}
                placeholder={intl.formatMessage(this.messages.searchPlaceholder)}
                type={selectedAttribute.value === 'id' ? 'number' : 'text'}
              />
            </Col>
            <Col xs={1}>
              <Button className="ContentTemplateList__searchform--button" bsStyle="primary" type="submit">
                <Icon name="search" />
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

ContentTemplateSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChangeSearchType: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  selectedAttribute: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

ContentTemplateSearchFormBody.defaultProps = {
  searchTerm: '',
};

const ContentTemplateSearchForm = reduxForm({
  form: 'contentTemplateSearchForm',
})(ContentTemplateSearchFormBody);

export default injectIntl(ContentTemplateSearchForm);
