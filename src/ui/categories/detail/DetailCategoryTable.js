import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'patternfly-react';
import { Collapse } from 'react-bootstrap';
import GenericRefsTable from 'ui/common/references/GenericRefsTable';

class DetailCategoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { category, referenceList, referenceMap } = this.props;

    const renderTitles = () => {
      if (category.titles) {
        return Object.keys(category.titles).map(langKey => (
          <span key={langKey} className="DetailCategory__detail-titles">
            <span className="DetailCategory__detail-titles-key">{langKey}</span>
            {category.titles[langKey]}
          </span>
        ));
      }
      return '';
    };

    const renderReferences = () => (
      referenceList.map(referenceKey => (
        <Row key={`${referenceKey}`}>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend><FormattedMessage id={`reference.${referenceKey}`} /></legend>
              <GenericRefsTable
                referenceKey={referenceKey}
                references={referenceMap[referenceKey]}
              />
            </fieldset>
          </Col>
        </Row>
      ))
    );

    return (
      <div className="DetailCategory">
        <Button
          onClick={() => this.setState({ open: !this.state.open })}
          bsStyle="primary"
          className="DetailCategory__collapse-trigger"
        >
          <span className="icon fa fa-chevron-down" />&nbsp;
          <FormattedMessage id="app.info" />
        </Button>
        <Collapse in={this.state.open}>
          <Col xs={12} className="DetailCategory__detail-list">
            <Row className="DetailCategory__detail-row">
              <Col xs={2} className="DetailCategory__detail-label"><FormattedMessage id="app.code" /></Col>
              <Col xs={10} className="DetailCategory__detail-item">{category.code}</Col>
            </Row>
            <Row className="DetailCategory__detail-row">
              <Col xs={2} className="DetailCategory__detail-label"><FormattedMessage id="app.title" /></Col>
              <Col xs={10} className="DetailCategory__detail-item">{renderTitles()}</Col>
            </Row>
          </Col>
        </Collapse>

        {renderReferences()}
      </div>

    );
  }
}

DetailCategoryTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  category: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
  referenceList: PropTypes.arrayOf(PropTypes.string),
  referenceMap: PropTypes.shape({}),
};

DetailCategoryTable.defaultProps = {
  referenceList: [],
  referenceMap: {},
};

export default DetailCategoryTable;
