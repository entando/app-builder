import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Button } from 'patternfly-react';
import { Field, FieldArray } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

// const msgTitle = defineMessages({
//   langCode: { id: `app.${lang.code}Title` },
// });

const maxLength70 = maxLength(70);

const SeoInfo = ({ languages, intl }) => (languages && languages.length ? (
  <Tabs id="basic-tabs" defaultActiveKey={1}>
    {
      languages.map((lang, i) => (
        <Tab eventKey={i} title={lang.code} >
          <div className="tab-content margin-large-bottom ">
            <div className="tab-pane fade in active">
              <Field
                key={`titles.${lang.code}`}
                component={RenderTextInput}
                name={`titles.${lang.code}`}
                label={<FormLabel helpId="app.pages.titleHelp" labelId="app.pages.title" required />}
                validate={[required, maxLength70]}
                onChange={(ev) => {
                  // if (onChangeDefaultTitle && lang.isDefault) {
                  //   onChangeDefaultTitle(ev.currentTarget.value);
                  // }
                }}
              />

              <Field
                key={`seoDescription.${lang.code}`}
                component={RenderTextInput}
                name={`seoDescription.${lang.code}`}
                label={<FormLabel helpId="app.seo.descriptionHelp" labelId="app.seo.description" />}
              />

              <Field
                key={`seoKeywords.${lang.code}`}
                component={RenderTextInput}
                name={`seoKeywords.${lang.code}`}
                label={<FormLabel helpId="app.seo.keywordsHelp" labelId="app.seo.keywords" />}
              />


              <FormLabel helpId="app.seo.addMetatagHelp" labelId="app.seo.addMetatag" />

              <RenderTextInput
                key={`addMetatagKey.${lang.code}`}
                name={`addMetatagKey.${lang.code}`}
                label={<FormLabel labelId="app.seo.addMetatagKey" />}
              />
              <RenderTextInput
                key={`addMetatagValue.${lang.code}`}
                name={`addMetatagValue.${lang.code}`}
                label={<FormLabel labelId="app.seo.addMetatagValue" />}
              />

              <Button bsStyle="primary">
                <FormattedMessage id="app.add" />
              </Button>

            </div>
          </div>
        </Tab>
      ))
    }
  </Tabs>
) : '');

SeoInfo.propTypes = {
  intl: intlShape.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SeoInfo;
