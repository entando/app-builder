import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, Row, Col, ButtonGroup } from 'patternfly-react';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

export default class NavigationBarConfigForm extends PureComponent {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      intl,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      languages,
      language,
      pages,
    } = this.props;
    console.log('languages', languages, language, pages);
    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <Fragment>
        <h5>
          <span className="icon fa fa-puzzle-piece" title="Widget" />
          {' '}
          <FormattedMessage id="widget.navigationBar.config.title" defaultMessage="Navigation - Bar" />
        </h5>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle
                  titleId="widget.navigationBar.config.expressionList"
                  requireFields={false}
                />
                <Col lg={6} md={10} smOffset={2} className="no-padding">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <Row>
                        <Col md={8} sm={8} xs={7}>
                          <span className="label label-info">1</span>
                          {' '}
                          <label className="label label-default">
                            <FormattedMessage id="widget.navigationBar.config.page" defaultMessage="Page" />
                          </label>
                          {' '}
                          <FormattedMessage id="widget.navigationBar.config.specific" defaultMessage="Specific" />:
                          {' '}
                          Home / Municipality
                          {' '}
                          <label className="label label-default" title="Operator"><span className="icon fa fa-angle-right" /></label>
                          {' '}
                          All sons of the page
                        </Col>
                        <Col md={4} sm={4} xs={5}>
                          <div className="btn-toolbar pull-right">
                            <ButtonGroup bsSize="small">
                              <Button onClick={() => {}}>
                                <span className="icon fa fa-sort-asc" />
                              </Button>
                              <Button onClick={() => {}}>
                                <span className="icon fa fa-sort-desc" />
                              </Button>
                            </ButtonGroup>
                            <Button onClick={() => {}} className="NavigationBarConfigForm__btn-remove" title="Delete">
                              <span className="fa fa-trash-o fa-lg" />
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </Col>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right AddContentTypeFormBody__save--btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
              <Button
                className="pull-right AddContentTypeFormBody__cancel--btn"
                bsStyle="default"
                onClick={handleCancelClick}
              >
                <FormattedMessage id="app.cancel" />
              </Button>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                invalid={invalid}
                submitting={submitting}
                onSave={onSave}
                onDiscard={onDiscard}
              />
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }
}

NavigationBarConfigForm.propTypes = {
  intl: intlShape.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

NavigationBarConfigForm.defaultProps = {
  languages: [],
  pages: [],
  dirty: false,
};
