import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup, Field } from 'patternfly-react';
import { FieldArray } from 'redux-form';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { formattedText } from 'frontend-common-components';

class AttributeEnumEnumMap extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const { selectedJoinAllowedOtions, allowedRoles } = this.props;
    const selectAllowedOptions = allowedRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));

    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.settings" />
            </legend>
            <Field
              component={RenderTextInput}
              name="enumeratorStaticItems"
              label={
                <FormLabel labelId="app.enumeratorStaticItems" />
              }
              placeholder={formattedText('app.enumeratorStaticItems.help')}
            />
            <Field
              component={RenderTextInput}
              name="enumeratorStaticItemsSeparator"
              label={
                <FormLabel labelId="app.enumeratorStaticItemsSeparator" />
              }
            />
            <FormGroup>
              <label htmlFor="attrRole" className="col-xs-2 control-label">
                <FormattedMessage id="app.enumeratorExtractorBean" />
              </label>
              <Col xs={10}>
                <FieldArray
                  component={MultiSelectRenderer}
                  name="allowedRoles"
                  options={selectAllowedOptions}
                  selectedValues={selectedJoinAllowedOtions}
                  labelKey="text"
                  valueKey="value"
                  emptyOptionTextId="app.chooseARole"
                />
              </Col>
            </FormGroup>
          </fieldset>
        </Col>
      </Row>
    );
  }
}

AttributeEnumEnumMap.propTypes = {
  onWillMount: PropTypes.func,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  selectedJoinAllowedOtions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

AttributeEnumEnumMap.defaultProps = {
  onWillMount: () => {},
  allowedRoles: [],
};


export default AttributeEnumEnumMap;
