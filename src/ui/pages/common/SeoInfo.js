import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Col, ControlLabel } from 'patternfly-react';
import { Field, FieldArray } from 'redux-form';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

import SeoInfoMetadata from 'ui/pages/common/SeoInfoMetadata';

// const msgTitle = defineMessages({
//   langCode: { id: `app.${lang.code}Title` },
// });

const maxLength70 = maxLength(70);

const SeoInfo = ({ languages, onChangeDefaultTitle }) => (languages && languages.length ? (
  <Tabs id="basic-tabs" defaultActiveKey={0} className="SeoInfo">
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
                    <ControlLabel htmlFor={`SEO.description.${lang.code}.value`}>
                      <FormLabel helpId="app.seo.descriptionHelp" labelId="app.seo.description" />
                    </ControlLabel>
                  </div>
                </Col>
                <Col sm={lang.isDefault ? 9 : 6}>
                  <Field
                    key={`SEO.description.${lang.code}.value`}
                    component={RenderTextInput}
                    name={`SEO.description.${lang.code}.value`}
                    inputSize={12}
                    labelSize={0}
                  />
                </Col>
                {!lang.isDefault && (
                  <Col sm={3} className="text-right">
                    <Field
                      component={SwitchRenderer}
                      name={`SEO.description.${lang.code}.inherit`}
                      label={<FormLabel labelId="app.seo.inheritLangLabel" />}
                      labelSize={7}
                    />
                  </Col>
                )}
              </div>

              <div className="form-group SeoInfo__metadata--itemgroup">
                <Col sm={2}>
                  <div className="text-right SeoInfo__metadata--itemgroup">
                    <ControlLabel htmlFor={`SEO.keywords.${lang.code}.value`}>
                      <FormLabel helpId="app.seo.keywordsHelp" labelId="app.seo.keywords" />
                    </ControlLabel>
                  </div>
                </Col>
                <Col sm={lang.isDefault ? 9 : 6}>
                  <Field
                    key={`SEO.keywords.${lang.code}.value`}
                    component={RenderTextInput}
                    name={`SEO.keywords.${lang.code}.value`}
                    inputSize={12}
                    labelSize={0}
                  />
                </Col>
                {!lang.isDefault && (
                  <Col sm={3} className="text-right">
                    <Field
                      component={SwitchRenderer}
                      name={`SEO.keywords.${lang.code}.inherit`}
                      label={<FormLabel labelId="app.seo.inheritLangLabel" />}
                      labelSize={7}
                    />
                  </Col>
                )}
              </div>

              <FieldArray
                component={SeoInfoMetadata}
                name="SEO.metatags"
                langIdx={i}
                langCode={lang.code}
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
