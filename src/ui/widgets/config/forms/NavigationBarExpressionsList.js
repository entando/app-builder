import { Alert, Button, ButtonGroup, Col, Row, Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

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

const getOperator = ({ operator, operatorSubtreeLevel }, intl) => {
  const name = <FormattedMessage id={messages[operator] || 'operator'} />;
  switch (operator) {
    case 'subtree':
      return (
        <abbr title={intl.formatMessage({ id: 'widget.navigationBar.config.subtreeDepthAbr' })}>
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

const generateListItemString = (expression, pages, language, intl) => {
  const { spec } = expression;
  console.log('Pages', pages);
  return (
    <React.Fragment>
      {'  '}
      <FormattedMessage id={messages[spec] || 'spec'} />
      {'  '}
      {getSpec(expression, pages, language)}
      {'  '}
      <label className="label label-default" title="Operator"><span className="icon fa fa-angle-right" /></label>
      {'  '}
      {getOperator(expression, intl)}
    </React.Fragment>
  );
};

const NavigationBarExpressionsList = ({
  fields,
  expressions,
  pages,
  language,
  loading,
  intl,
  navSpec,
}) => {
  console.log('FIELDS', expressions);
  // console.log("Pages", pages);
  const renderList = expressions.map((_, i) => {
    expressions.prototype = { ...expressions.prototype, ...fields };
    const expression = expressions[i] || {};
    return (
      <li className="list-group-item" key={uuidv4()}>
        <Row className="NavigationBarConfigForm__expression-row">
          <Col md={8} sm={8} xs={7} className="NavigationBarConfigForm__expression-col">
            <span className="label label-info">{i + 1}</span>
            {' '}
            <label className="label label-default">
              <FormattedMessage id="widget.navigationBar.config.page" defaultMessage="Page" />
            </label>
            {generateListItemString(expression, pages, language, intl)}
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
                  i !== expressions.length - 1
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

  const isLoading = (navSpec != null && navSpec.length > 0) && ((!!loading) && (loading !== null));
  return (
    <Spinner loading={isLoading}>
      {
        (!expressions || !expressions.length) ? (
          <Alert type="info">
            <FormattedMessage id="widget.navigationBar.config.noExpressions" />
          </Alert>
        ) : (
          <ul className="list-group">
            {renderList}
          </ul>
        )
      }

    </Spinner>
  );
};


NavigationBarExpressionsList.propTypes = {
  intl: intlShape.isRequired,
  /* fields: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    push: PropTypes.func,
    map: PropTypes.func,
    get: PropTypes.func,
    remove: PropTypes.func,
    length: PropTypes.number,
    swap: PropTypes.func,
  }).isRequired, */
  fields: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    move: PropTypes.func,
    swap: PropTypes.func,
    push: PropTypes.func,
    insert: PropTypes.func,
    unshift: PropTypes.func,
    pop: PropTypes.func,
    remove: PropTypes.func,
    form: PropTypes.shape({
      initialValues: PropTypes.shape({
        expressions: PropTypes.arrayOf({}).isRequired,
      }),
    }),
  }).isRequired,
  expressions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  language: PropTypes.string,
  navSpec: PropTypes.string,
  loading: PropTypes.bool,
};

NavigationBarExpressionsList.defaultProps = {
  language: 'en',
  loading: null,
  navSpec: '',
};

export default NavigationBarExpressionsList;
