import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { FieldArray } from 'redux-form';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';

class AttributeRole extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const { JoinAllowedOptions2, allowedRoles } = this.props;

    const selectAllowedOptions = allowedRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));
    console.log('join', selectAllowedOptions);

    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.roles" />
            </legend>
            <FormGroup>
              <label htmlFor="attrRole" className="col-xs-2 control-label">
                <FormattedMessage id="app.role" />
              </label>
              <Col xs={10}>
                <FieldArray
                  component={MultiSelectRenderer}
                  name="allowedRoles"
                  options={selectAllowedOptions}
                  selectedValues={JoinAllowedOptions2}
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

AttributeRole.propTypes = {
  onWillMount: PropTypes.func,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  JoinAllowedOptions2: PropTypes.arrayOf(PropTypes.string).isRequired,
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
  allowedRoles: [],
};


export default AttributeRole;
