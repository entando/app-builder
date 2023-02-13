import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Col, ControlLabel } from 'patternfly-react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/formik-field/SwitchInput';
import SeoInfoMetadata from 'ui/pages/common/SeoInfoMetadata';

const friendlyCodeValidation = value => (value && !/^[0-9a-z_]+$/g.test(value) ?
  <FormattedMessage id="validateForm.friendlyCode" /> : undefined);

const uniqueFriendlyCodeValidation = (value, allValues) => {
  const friendlyCodes = Object.values((allValues.seoData || {}).seoDataByLang || {})
    .reduce((acc, curr) =>
      ([...acc, curr.friendlyCode.toLowerCase()]), []);
  const isNotUnique = value && friendlyCodes.filter(v => v === value.toLowerCase()).length >= 2;
  return !isNotUnique ? undefined : <FormattedMessage id="validateForm.friendlyCodeUnique" />;
};

const SeoInfo = ({
  languages,
  readOnly,
}) => {
  const [touchedTabs, setTouchedTabs] = React.useState([]);

  const formik = useFormikContext();

  const defaultLang = React.useMemo(
    () => languages.find(lang => lang.isDefault) || {}
    , [languages],
  );

  const handleSelect = (key) => {
    if (!touchedTabs.includes(key)) {
      setTouchedTabs([...touchedTabs, key]);
    }
  };

  const validateTitle = (key, val) => {
    if (touchedTabs.includes(key) || defaultLang.code === key) {
      if (!val || val.length === 0) {
        return <FormattedMessage id="validateForm.required" />;
      }
      if (val.length > 70) {
        return <FormattedMessage id="validateForm.maxLength" values={{ max: 70 }} />;
      }
    }
    return null;
  };

  const validateFriendlyCode = (val) => {
    let error = null;
    if (val && val.length > 100) {
      error = <FormattedMessage id="validateForm.maxLength" values={{ max: 100 }} />;
      return error;
    }
    if (val && val.length > 0) {
      error = friendlyCodeValidation(val);
      if (error) return error;
      error = uniqueFriendlyCodeValidation(val, formik.values);
      if (error) return error;
    }
    return null;
  };

  return (languages && languages.length ? (
    <Tabs mountOnEnter unmountOnExit id="basic-tabs" defaultActiveKey={defaultLang ? defaultLang.code : undefined} className="SeoInfo" onSelect={handleSelect}>
      {
        languages.map((lang, i) => (
          <Tab key={lang.code} eventKey={lang.code} title={`${lang.code.toUpperCase()}${lang.code === defaultLang.code ? '*' : ''}`} >
            <div className="tab-content margin-large-bottom ">
              <div className="tab-pane SeoInfo__section fade in active">
                <Field
                  key={`titles.${lang.code}`}
                  component={RenderTextInput}
                  name={`titles.${lang.code}`}
                  data-testid={`titles.${lang.code}`}
                  tourClass="app-tour-step-6"
                  label={<FormLabel helpId="app.pages.titleHelp" labelId="app.pages.title" required />}
                  validate={val => validateTitle(lang.code, val)}
                  inputSize={9}
                  onChange={(ev) => {
                    if (lang.isDefault) {
                      formik.setFieldValue('code', ev.currentTarget.value && ev.currentTarget.value.replace(/\W/g, '_').toLowerCase());
                    }
                  }}
                  disabled={readOnly}
                />
                <div className="form-group SeoInfo__metadata--itemgroup">
                  <Col sm={2}>
                    <div className="text-right SeoInfo__metadata--itemgroup">
                      <ControlLabel htmlFor={`seoData.seoDataByLang.${lang.code}.description`}>
                        <FormLabel helpId="app.seo.descriptionHelp" labelId="app.seo.description" />
                      </ControlLabel>
                    </div>
                  </Col>
                  <Col sm={lang.isDefault ? 9 : 6}>
                    <Field
                      key={`seoData.seoDataByLang.${lang.code}.description`}
                      component={RenderTextInput}
                      name={`seoData.seoDataByLang.${lang.code}.description`}
                      inputSize={12}
                      labelSize={0}
                      disabled={readOnly}
                    />
                  </Col>
                  {!lang.isDefault && (
                  <Col sm={3} className="text-right">
                    <Field
                      component={SwitchRenderer}
                      name={`seoData.seoDataByLang.${lang.code}.inheritDescriptionFromDefaultLang`}
                      label={<FormLabel labelId="app.seo.inheritLangLabel" />}
                      labelSize={7}
                      disabled={readOnly}
                    />
                  </Col>
                    )}
                </div>

                <div className="form-group SeoInfo__metadata--itemgroup">
                  <Col sm={2}>
                    <div className="text-right SeoInfo__metadata--itemgroup">
                      <ControlLabel htmlFor={`seoData.seoDataByLang.${lang.code}.keywords`}>
                        <FormLabel helpId="app.seo.keywordsHelp" labelId="app.seo.keywords" />
                      </ControlLabel>
                    </div>
                  </Col>
                  <Col sm={lang.isDefault ? 9 : 6}>
                    <Field
                      key={`seoData.seoDataByLang.${lang.code}.keywords`}
                      component={RenderTextInput}
                      name={`seoData.seoDataByLang.${lang.code}.keywords`}
                      inputSize={12}
                      labelSize={0}
                      disabled={readOnly}
                    />
                  </Col>
                  {!lang.isDefault && (
                  <Col sm={3} className="text-right">
                    <Field
                      component={SwitchRenderer}
                      name={`seoData.seoDataByLang.${lang.code}.inheritKeywordsFromDefaultLang`}
                      label={<FormLabel labelId="app.seo.inheritLangLabel" />}
                      labelSize={7}
                      disabled={readOnly}
                    />
                  </Col>
                    )}
                </div>

                <div className="form-group SeoInfo__metadata--itemgroup">
                  <Col sm={2}>
                    <div className="text-right SeoInfo__metadata--itemgroup">
                      <ControlLabel htmlFor={`seoData.seoDataByLang.${lang.code}.keywords`}>
                        <FormLabel helpId="app.pages.friendlyCodeHelp" labelId="pages.pageForm.seoFriendlyCode" />
                      </ControlLabel>
                    </div>
                  </Col>
                  <Col sm={lang.isDefault ? 9 : 6}>
                    <Field
                      component={RenderTextInput}
                      key={`seoData.seoDataByLang.${lang.code}.friendlyCode`}
                      name={`seoData.seoDataByLang.${lang.code}.friendlyCode`}
                      disabled={readOnly}
                      inputSize={12}
                      validate={validateFriendlyCode}
                      labelSize={0}
                    />
                  </Col>
                </div>
                <FieldArray
                  render={() => (
                    <SeoInfoMetadata
                      value={((((formik.values || {}).seoData || {})
                      .seoDataByLang || {})[lang.code] || {}).metaTags || []}
                      lang={lang}
                      readOnly={readOnly}
                      langIdx={i}
                      languages={languages}
                    />
                  )}
                  name={`seoData.seoDataByLang.${lang.code}.metaTags`}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </Tab>
        ))
      }
    </Tabs>
  ) : '');
};


SeoInfo.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  readOnly: PropTypes.bool,
};

SeoInfo.defaultProps = {
  readOnly: false,
};

export default SeoInfo;
