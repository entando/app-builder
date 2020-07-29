import { connect } from 'react-redux';
import { arrayPush, arraySplice } from 'redux-form';
import SeoInfoMetadata from 'ui/pages/common/SeoInfoMetadata';

export const mapDispatchToProps = (dispatch, { languages }) => ({
  onPushMetadata: ({ metakey, metavalue }) => {
    const meta = {
      key: metakey,
      type: 'name',
      value: metavalue,
      useDefaultLang: false,
    };
    languages.forEach((lang) => {
      dispatch(arrayPush(
        'page',
        `seoData.seoDataByLang.${lang.code}.metaTags`,
        { ...meta },
      ));
    });
  },
  onRemoveMetadata: idx => (
    languages.forEach((lang) => {
      dispatch(arraySplice(
        'page',
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
