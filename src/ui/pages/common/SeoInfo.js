import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Col, ControlLabel } from 'patternfly-react';
import { Field, FieldArray } from 'redux-form';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

import SeoInfoMetadataContainer from 'ui/pages/common/SeoInfoMetadataContainer';

const maxLength70 = maxLength(70);

const SeoInfo = ({ languages, onChangeDefaultTitle }) => (languages && languages.length ? (
  <Tabs id="basic-tabs" defaultActiveKey={0} className="SeoInfo" mountOnEnter>
    {
      languages.map((lang, i) => (
        <Tab key={lang.code} eventKey={i} title={`${lang.code.toUpperCase()}${i === 0 ? '*' : ''}`} >
          <div className="tab-content margin-large-bottom ">
            <div className="tab-pane SeoInfo__section fade in active">
              <Field
                key={`titles.${lang.code}`}
                component={RenderTextInput}
                name={`titles.${lang.code}`}
                label={<FormLabel helpId="app.pages.titleHelp" labelId="app.pages.title" required />}
                validate={[required, maxLength70]}
                inputSize={9}
                onChange={(ev) => {
                  if (onChangeDefaultTitle && lang.isDefault) {
                    onChangeDefaultTitle(ev.currentTarget.value);
                  }
                }}
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
                  />
                </Col>
                {!lang.isDefault && (
                  <Col sm={3} className="text-right">
                    <Field
                      component={SwitchRenderer}
                      name={`seoData.seoDataByLang.${lang.code}.inheritDescriptionFromDefaultLang`}
                      label={<FormLabel labelId="app.seo.inheritLangLabel" />}
                      labelSize={7}
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
                  />
                </Col>
                {!lang.isDefault && (
                  <Col sm={3} className="text-right">
                    <Field
                      component={SwitchRenderer}
                      name={`seoData.seoDataByLang.${lang.code}.inheritKeywordsFromDefaultLang`}
                      label={<FormLabel labelId="app.seo.inheritLangLabel" />}
                      labelSize={7}
                    />
                  </Col>
                )}
              </div>

              <FieldArray
                component={SeoInfoMetadataContainer}
                name={`seoData.seoDataByLang.${lang.code}.metaTags`}
                langIdx={i}
                languages={languages}
              />
            </div>
          </div>
        </Tab>
      ))
    }
  </Tabs>
) : '');

SeoInfo.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChangeDefaultTitle: PropTypes.func,
};

SeoInfo.defaultProps = {
  onChangeDefaultTitle: null,
};

export default SeoInfo;
