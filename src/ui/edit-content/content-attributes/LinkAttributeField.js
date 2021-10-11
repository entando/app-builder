import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';
import { get, omit } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Col, Row, Button } from 'patternfly-react';
import { Panel } from 'react-bootstrap';

import RenderButton from 'ui/common/form/RenderButton';
import attributeShape from 'ui/edit-content/content-attributes/attributeShape';
import LinkConfigModal from 'ui/common/modal/LinkConfigModal';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';


class LinkAttributeField extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleAddClick() {
    this.setState({
      modalVisible: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalVisible: false,
    });
  }

  handleSave(values) {
    const { url } = values;
    const destType = {
      U: 1,
      P: 2,
      C: 3,
    }[url[2]];
    const destKey = ['urlDest', 'pageDest', 'contentDest'][destType - 1];
    const dest = url.slice(4, -2);

    const { input } = this.props;
    input.onChange({
      ...input.value,
      value: {
        symbolicDestination: url,
        destType,
        [destKey]: dest,
        ...omit(values, 'url'),
      },
    });

    this.handleModalClose();
  }

  handleDeleteClick() {
    const { input, langCode } = this.props;
    input.onChange({
      ...input.value,
      value: {},
      values: {
        [langCode]: '',
      },
    });
  }

  render() {
    const {
      input,
      label,
      meta,
      attribute,
      langCode,
      mainGroup,
      joinGroups,
      ...rest
    } = this.props;

    const { value, values } = input.value;
    const {
      urlDest, pageDest, contentDest, rel, hreflang, target, destType,
    } = value || {};
    const dest = urlDest || pageDest || contentDest;

    const textInput = {
      name: `${input.name}.values.${langCode}`,
      value: get(values, langCode, ''),
      onChange: (event) => {
        input.onChange({
          ...input.value,
          values: {
            ...(values || {}),
            [langCode]: event.target.value,
          },
        });
      },
    };

    const { modalVisible } = this.state;

    return (
      <Fragment>
        {dest ? (
          <Row>
            <label className="control-label col-xs-2">
              {label}
            </label>
            <Col xs={10}>
              <Panel>
                <Panel.Body>
                  <div className="form-group">
                    <Col xs={2} className="text-right">
                      <span style={{ fontWeight: '600' }}>URL</span>
                    </Col>
                    <Col xs={10}>
                      <span>{dest}</span>
                    </Col>
                  </div>
                  <div className="form-group">
                    <Col xs={2} className="text-right">
                      <span style={{ fontWeight: '600' }}>rel</span>
                    </Col>
                    <Col xs={10}>
                      <span>{rel}</span>
                    </Col>
                  </div>
                  <div className="form-group">
                    <Col xs={2} className="text-right">
                      <span style={{ fontWeight: '600' }}>target</span>
                    </Col>
                    <Col xs={10}>
                      <span>{target}</span>
                    </Col>
                  </div>
                  <div className="form-group">
                    <Col xs={2} className="text-right">
                      <span style={{ fontWeight: '600' }}>hreflang</span>
                    </Col>
                    <Col xs={10}>
                      <span>{hreflang}</span>
                    </Col>
                  </div>
                  <RenderTextInput
                    input={textInput}
                    label={<FormLabel labelText="Text" required />}
                  />
                  <div className="text-right">
                    <Button
                      bsStyle="default"
                      style={{ marginRight: '10px' }}
                      onClick={this.handleAddClick}
                    >
                      <FormattedMessage id="cms.label.edit" />
                    </Button>
                    <Button
                      bsStyle="danger"
                      onClick={this.handleDeleteClick}
                    >
                      <FormattedMessage id="cms.label.delete" />
                    </Button>
                  </div>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        ) : (
          <RenderButton
            bsStyle="primary"
            buttonContent={<FormattedMessage id="cms.label.add" defaultMessage="Add" />}
            label={label}
            meta={meta}
            onClick={this.handleAddClick}
            {...rest}
          />
        )}
        {modalVisible
          ? (
            <LinkConfigModal
              isVisible={modalVisible}
              mainGroup={mainGroup}
              joinGroups={joinGroups}
              onClose={this.handleModalClose}
              onSave={this.handleSave}
              parameters={{
                dest, pageDest, contentDest, rel, target, hreflang, destType,
              }}
            />
          ) : null}
      </Fragment>
    );
  }
}

LinkAttributeField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.node.isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
  langCode: PropTypes.string.isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default LinkAttributeField;
