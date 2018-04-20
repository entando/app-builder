import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from 'patternfly-react';
import { required } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const ActiveLanguagesFields = ({ activeLanguages, defaultLanguage, onChangeDefaultTitle }) => {
  const renderField = () => activeLanguages.map((language) => {
    const titles = `titles.${language.code}`;

    const isDefault = language.code === defaultLanguage;

    return (
      <Field
        key={language.code}
        name={titles}
        component={RenderTextInput}
        label={
          <span>
            <span className="label label-info">
              {isDefault ? `${language.code} *` : language.code}
            </span>
            <FormattedMessage id="app.name" /> *
          </span>
           }
        placeholder={language.name}
        className="form-control"
        validate={[required]}
        onChange={(ev) => {
            if (isDefault && onChangeDefaultTitle) onChangeDefaultTitle(ev.currentTarget.value);
          }}
      />
    );
  });

  return (
    <div className="ActiveLanguagesFields">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="tab-content margin-large-bottom ">
              <div>
                {renderField()}
              </div>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

ActiveLanguagesFields.propTypes = {
  activeLanguages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    isActive: PropTypes.bool,
    isDefault: PropTypes.bool,
  })),
  defaultLanguage: PropTypes.string,
  onChangeDefaultTitle: PropTypes.func,
};

ActiveLanguagesFields.defaultProps = {
  activeLanguages: [],
  defaultLanguage: '',
  onChangeDefaultTitle: null,
};

export default ActiveLanguagesFields;
