import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Row, Col } from 'patternfly-react';
import moment from 'moment';
import { formattedText } from '@entando/utils';
import { renderInstallActions, renderComponentImageOrPlaceholder } from 'helpers/digital-exchange/components';
import StarRating from 'ui/digital-exchange/common/StarRating';

class ComponentList extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderComponentListView() {
    return (
      this.props.digitalExchangeComponents.map(component => (
        <div key={component.id}>
          <h2>{component.name}</h2>
          <ul>
            <li> marketplace: {component.marketplace} </li>
            <li> rating: {component.rating} </li>
            <li> category: {component.type} </li>
          </ul>
        </div>
      ))
    );
  }

  renderComponentGridView() {
    const componentPairs = this.props.digitalExchangeComponents
      .reduce((acc, component, index, sourceArray) => {
        if (index % 2 === 0) {
          acc.push(sourceArray.slice(index, index + 2));
        }

        return acc;
      }, []);

    return (
      <div className="ComponentListGridView">
        {componentPairs.map(componentPair => (
          <Row key={`${componentPair[0].id}-pair`} className="no-gutter equal">
            {componentPair.map((component) => {
              const date = moment(component.lastUpdate).format('MMMM, D, YYYY');
              return (
                <Col md={6} key={component.id} className="ComponentListGridView__component">
                  <Row key={component.id} className="no-gutter">
                    <Col md={4}>
                      <a href="#">
                        {renderComponentImageOrPlaceholder(component)}
                      </a>
                      {renderInstallActions(component)}
                    </Col>
                    <Col md={8} className="no-gutter">
                      <div className="ComponentListGridView__component-body">
                        <h1>{component.name}</h1>
                        <span className="ComponentListGridView__date">{date}</span>
                        <span className="ComponentListGridView__version">
                          {formattedText('digital-exchange.components.latest-version')}: {component.version}
                        </span>
                        <span className="ComponentListGridView__rating">
                          <StarRating maxRating={5} rating={component.rating} />
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              );
            })
          }
          </Row>))
        }
      </div>
    );
  }

  render() {
    let renderComponents = '';
    if (this.props.listViewMode === 'list-view') {
      renderComponents = this.renderComponentListView();
    } else {
      renderComponents = this.renderComponentGridView();
    }

    return (
      <div className="ComponentList">
        <Spinner loading={!!this.props.loading} >
          {renderComponents}
        </Spinner>
      </div>
    );
  }
}

ComponentList.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  listViewMode: PropTypes.string,
  digitalExchangeComponents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    marketplace: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  })),
};

ComponentList.defaultProps = {
  onWillMount: () => {},
  loading: false,
  digitalExchangeComponents: [],
  listViewMode: 'gird-view',
};

export default ComponentList;
