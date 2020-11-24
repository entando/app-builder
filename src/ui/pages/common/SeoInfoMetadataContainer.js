import { connect } from 'react-redux';
import { reset, arrayPush, arraySplice } from 'redux-form';
import SeoInfoMetadata from 'ui/pages/common/SeoInfoMetadata';

export const mapDispatchToProps = (dispatch, { languages, pageForm }) => ({
  onPushMetadata: ({ metakey, metatype, metavalue }) => {
    const meta = {
      key: metakey,
      type: metatype,
      value: metavalue,
      useDefaultLang: false,
    };
    languages.forEach((lang) => {
      dispatch(arrayPush(
        pageForm,
        `seoData.seoDataByLang.${lang.code}.metaTags`,
        { ...meta },
      ));
    });
    dispatch(reset('SeoMetadataForm'));
  },
  onRemoveMetadata: idx => (
    languages.forEach((lang) => {
      dispatch(arraySplice(
        pageForm,
        `seoData.seoDataByLang.${lang.code}.metaTags`,
        idx,
        1,
      ));
    })
  ),
});

export default connect(null, mapDispatchToProps, null, {
  pure: false,
})(SeoInfoMetadata);
