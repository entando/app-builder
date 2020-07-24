import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col, ButtonGroup } from 'patternfly-react';

const messages = {
  current: 'widget.navigationBar.config.this',
  parent: 'widget.navigationBar.config.parent',
  super: 'widget.navigationBar.config.fromThis',
  abs: 'widget.navigationBar.config.fromRoot',
  code: 'widget.navigationBar.config.specific',
  children: 'widget.navigationBar.config.allChildren',
  path: 'widget.navigationBar.config.fromTheRootToSelected',
  subtree: 'widget.navigationBar.config.subtree',
};

const getSpec = ({
  spec, specSuperLevel, specAbsLevel, targetCode,
}, pages, language) => {
  switch (spec) {
    case 'super':
      return specSuperLevel;
    case 'abs':
      return specAbsLevel;
    case 'code': {
      const { fullTitles = {} } = pages.filter(page => page.code === targetCode)[0] || {};
      return fullTitles[language];
    }
    default:
      return null;
  }
};

const getOperator = ({ operator, operatorSubtreeLevel }) => {
  const name = <FormattedMessage id={messages[operator] || 'operator'} />;
  switch (operator) {
    case 'subtree':
      return (
        <abbr title="Subtree depth">
          {name}:  {operatorSubtreeLevel}
        </abbr>
      );
    case 'children':
      return name;
    case 'path':
      return name;
    default:
      return null;
  }
};

const generateListItemString = (expression, pages, language) => {
  const { spec } = expression;
  return (
    <React.Fragment>
      {'  '}
      <FormattedMessage id={messages[spec] || 'spec'} />
      {'  '}
      {getSpec(expression, pages, language)}
      {'  '}
      <label className="label label-default" title="Operator"><span className="icon fa fa-angle-right" /></label>
      {'  '}
      {getOperator(expression)}
    </React.Fragment>
  );
};

const NavigationBarExpressionsList = ({ fields, pages, language }) => {
  const renderList = fields.map((_, i) => {
    const expression = fields.get(i) || {};
    return (
      <li className="list-group-item" key={uuidv4()}>
        <Row>
          <Col md={8} sm={8} xs={7}>
            <span className="label label-info">{i + 1}</span>
            {' '}
            <label className="label label-default">
              <FormattedMessage id="widget.navigationBar.config.page" defaultMessage="Page" />
            </label>
            {generateListItemString(expression, pages, language)}
          </Col>
          <Col md={4} sm={4} xs={5}>
            <div className="btn-toolbar pull-right">
              <ButtonGroup bsSize="small">
                {
                  i !== 0
                  && (
                  <Button onClick={() => fields.swap(i, i - 1)}>
                    <span className="icon fa fa-sort-asc" />
                  </Button>
                  )
                }
                {
                  i !== fields.length - 1
                  && (
                  <Button onClick={() => fields.swap(i, i + 1)}>
                    <span className="icon fa fa-sort-desc" />
                  </Button>
                  )
                }
              </ButtonGroup>
              <Button
                className="NavigationBarConfigForm__btn-remove"
                title="Delete"
                onClick={() => fields.remove(i)}
                onKeyDown={() => fields.remove(i)}
              >
                <span className="fa fa-trash-o fa-lg" />
              </Button>
            </div>
          </Col>
        </Row>
      </li>
    );
  });
  return (
    <ul className="list-group">
      {renderList}
    </ul>
  );
};


NavigationBarExpressionsList.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    push: PropTypes.func,
    map: PropTypes.func,
    get: PropTypes.func,
    remove: PropTypes.func,
    length: PropTypes.number,
    swap: PropTypes.func,
  }).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  language: PropTypes.string,
};

NavigationBarExpressionsList.defaultProps = {
  language: 'en',
};

export default NavigationBarExpressionsList;
